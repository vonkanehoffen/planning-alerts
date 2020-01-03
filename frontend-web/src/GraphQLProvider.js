import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Loading from "./components/Loading";
import { useAuth0 } from "./react-auth0-spa";
import config from "./config.json";

/**
 * Apollo Provider with Auth0 token.
 * @param children
 * @returns {*}
 * @constructor
 */
export const GraphQLProvider = ({ children }) => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();
  if (loading) {
    return <Loading fullscreen={true} />;
  }

  const client = new ApolloClient({
    uri: config.graphQlEndpoint,
    request: async operation => {
      // Get token or get refreshed token
      const token = isAuthenticated ? await getTokenSilently() : null;
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : undefined
        }
      });
    }
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
