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

import React from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping, light as theme } from "@eva-design/eva";
import { AppNavigator } from "./navigation/app.navigator";
import { GraphQLProvider } from "./data-layer/graphql-provider.component";
import { AuthProvider } from "./screens/auth/auth-provider.component";

export function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <AuthProvider>
          <GraphQLProvider>
            <AppNavigator />
          </GraphQLProvider>
        </AuthProvider>
      </ApplicationProvider>
    </>
  );
}
