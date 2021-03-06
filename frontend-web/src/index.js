import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./config.json";
import { navigate } from "@reach/router";
import { GraphQLProvider } from "./GraphQLProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  navigate(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={config.audience}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GraphQLProvider>
        <App />
      </GraphQLProvider>
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
