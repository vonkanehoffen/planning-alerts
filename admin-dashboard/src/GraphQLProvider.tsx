import * as React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";
import Loading from "./components/Loading";
import { useAuth0 } from "./react-auth0-spa";
import config from "./config.json";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

interface GraphQLProviderProps {
  children: React.ReactNode
}
/**
 * Apollo Provider with Auth0 token.
 * @param children
 * @returns {*}
 * @constructor
 */
export const GraphQLProvider = ({ children}: GraphQLProviderProps) => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();
  if (loading) {
    return <Loading />;
  }

  const wsLink = new WebSocketLink({
    uri: 'ws://planning-alerts.herokuapp.com/v1/graphql',
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        const token = isAuthenticated ? await getTokenSilently() : null;
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      },
    },
  })

  const request = async (operation: any) => {
    // Get token or get refreshed token
    const token = isAuthenticated ? await getTokenSilently() : null;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : undefined
      }
    });
  }

  const requestLink = new ApolloLink((operation, forward) =>
    // @ts-ignore
    new Observable(observer => {
      // @ts-ignore
      let handle;
      Promise.resolve(operation)
        // @ts-ignore
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        // @ts-ignore
        if (handle) handle.unsubscribe();
      };
    })
  );

  // using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    new HttpLink({
      uri: config.graphQlEndpoint,
      credentials: 'same-origin',
    })
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      requestLink,
      link
    ]),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
