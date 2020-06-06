import React, { useContext } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { withClientState } from "apollo-link-state";
import { ApolloLink, Observable } from "apollo-link";
import config from "../../config.json";
import { AuthContext } from "../screens/auth/AuthProvider";
import { ApolloNetworkStatusProvider } from "react-apollo-network-status";

/**
 * Apollo Provider with Auth0 token.
 * See https://www.apollographql.com/docs/react/migrating/boost-migration/
 * @param children
 * @returns {*}
 * @constructor
 */
export const GraphQLProvider: React.FC = ({ children }) => {
  // @ts-ignore
  const { getIdTokenSilently } = useContext(AuthContext);

  const cache = new InMemoryCache({
    // cacheRedirects: {
    //   Query: {
    //     movie: (_, { id }, { getCacheKey }) =>
    //       getCacheKey({ __typename: 'Movie', id })
    //   }
    // }
  });

  const request = async (operation: any) => {
    const token = await getIdTokenSilently();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : undefined
      }
    });
    if (config.gqlDebug) {
      console.log(
        `HASURA REQUEST--------\n query: ${
          operation.query.loc.source.body
        }\n variables: ${JSON.stringify(operation.variables, null, 2)}`
      );
    }
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        // @ts-ignore
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          // @ts-ignore
          if (handle) handle.unsubscribe();
        };
      })
  );

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log("ApolloClient - GRAPHQL ERRORS: ", graphQLErrors);
        }
        if (networkError) {
          // logoutUser();
        }
      }),
      requestLink,
      withClientState({
        defaults: {
          isConnected: true
        },
        resolvers: {
          Mutation: {
            // @ts-ignore
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
              cache.writeData({ data: { isConnected } });
              return null;
            }
          }
        },
        cache
      }),
      new HttpLink({
        uri: config.graphQlEndpoint,
        credentials: "include"
      })
    ]),
    cache
  });

  return (
    <ApolloProvider client={client}>
      <ApolloNetworkStatusProvider>{children}</ApolloNetworkStatusProvider>
    </ApolloProvider>
  );
};
