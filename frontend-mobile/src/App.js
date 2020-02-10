/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {
  ApplicationProvider,
  IconRegistry
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import { AppNavigator } from './navigation/app.navigator'
import { AuthScreen } from './screens/auth/auth-screen.component'
import { GraphQLProvider } from './data-layer/graphql-provider.component'

export const AuthContext = React.createContext(null);

export function App () {
  // TODO: Is passing useState to context like this ok? Perf?
  // Preserve a refresh token with https://docs.expo.io/versions/latest/sdk/securestore/ somehow?
  const authState = React.useState(null);
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider mapping={mapping} theme={theme}>
        <AuthContext.Provider value={authState}>
          {authState[0] ? (
            <GraphQLProvider>
              <AppNavigator/>
            </GraphQLProvider>
          ) : (
            <AuthScreen/>
          )}
        </AuthContext.Provider>
      </ApplicationProvider>
    </>
  );
}
