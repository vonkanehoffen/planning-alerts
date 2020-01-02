import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Callback from "./Callback/Callback";
import SetLocation from "./SetLocation";
import Auth from "./Auth/Auth";
import { ApolloProvider } from "react-apollo";
import { client } from "./apolloClient";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  // TODO: Add auth context here
  return (
    <ApolloProvider client={client}>
      <Router>
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
          <Route path="/set-location" render={props => <SetLocation />} />
        </div>
      </Router>
    </ApolloProvider>
  );
};
