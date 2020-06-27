/**
 * Planning Alerts
 *
 * React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React, { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping } from "@eva-design/eva";
import theme from "./src/theme.json";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { GraphQLProvider } from "./src/data-layer/GraphQLProvider";
import { AuthProvider } from "./src/screens/auth/AuthProvider";
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from "@react-native-community/async-storage";

// Full Notification looks like:
// {
//   "newPaIds": "[\"126774/TEL/2020\",\"CDN/20/0111\"]",
//   "notification": {
//     "body": "Click here to see details",
//     "e": "1",
//     "title": "2 new planning applications near you this week."
//   }
// }
// Needs to....
//  - receive from index.js .setBackgroundMessageHandler (Async Storage)
//  - DOESN't need to receive from .onMessage here? - use already active. Map shouldn't change?
//  - Focus map on PAs when app first becomes active after notification
//  - Notification content doesn't matter. It comes from Graph query
//
//  ...so can we just
//  - Look for ANY async storage messages item on openPaData useEffect
//  - focus map and remove it immediately

/**
 * Initialise the app.
 * Setup listeners
 * Hide boot screen etc.
 * @constructor
 */
export function App(): React.ReactFragment {
  useEffect(() => {
    RNBootSplash.hide();
  });

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    // TODO: Reload planning apps here - newly alerted ones won't be in cache.
    //  or is that just on the pa status marker useEffect?
    console.log("App state change");
    const messages = await AsyncStorage.getItem("messages");
    console.log("MEssages on change", messages);
  };

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
