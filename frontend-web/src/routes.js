import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import history from "./history";
import ApolloClient from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import { GRAPHQL_URL } from "./constants";

// const httpLink = new HttpLink({
//   uri: GRAPHQL_URL
// });
//
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("auth0:id_token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ""
//     }
//   };
// });
//
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache({
//     addTypename: false
//   })
// });

const client = new ApolloClient({
  uri: "https://planning-alerts.herokuapp.com/v1/graphql",
  headers: {
    authorization: `Bearer ${localStorage.getItem("auth0:id_token")}`
  }
});

// const provideClient = component => {
//   return <ApolloProvider client={client}>{component}</ApolloProvider>;
// };

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div className="container">
          <Route path="/" render={props => <App auth={auth} {...props} />} />
          <Route
            path="/home"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </div>
      </Router>
    </ApolloProvider>
  );
};
