import React from 'react';
import { Auth0Provider } from './react-auth0-spa'
import { GraphQLProvider } from './GraphQLProvider'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import './App.css';
import { theme } from './theme'
import history from "./utils/history";
import config from './config.json';
import { NavBar } from './components/NavBar'
import { AppRouter } from './screens/AppRouter'

// A function that routes the user to the right place
// after login
function onRedirectCallback(appState?: any): void {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
}

function App() {
  return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={config.audience}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GraphQLProvider>
          <AppRouter/>
        </GraphQLProvider>
      </MuiThemeProvider>
    </Auth0Provider>
  );
}

export default App;
