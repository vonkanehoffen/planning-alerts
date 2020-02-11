import React, { useContext } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import config from "../../config.json";
import { AuthContext } from "../screens/auth/auth-provider.component";

/**
 * Apollo Provider with Auth0 token.
 * @param children
 * @returns {*}
 * @constructor
 */
export const GraphQLProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);

  const client = new ApolloClient({
    uri: config.graphQlEndpoint,
    request: async operation => {
      console.log("Doing gql query");
      operation.setContext({
        headers: {
          authorization: auth ? `Bearer ${auth.credentials.idToken}` : undefined
        }
      });
    }
  });
  console.log("GraphQLProvider rendering");
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
