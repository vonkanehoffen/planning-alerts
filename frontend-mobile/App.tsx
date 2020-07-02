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

import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping } from "@eva-design/eva";
import { myTheme } from "./src/custom-theme";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { GraphQLProvider } from "./src/data-layer/GraphQLProvider";
import { AuthProvider } from "./src/screens/auth/AuthProvider";
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from "@react-native-community/async-storage";
import messaging from "@react-native-firebase/messaging";

// Alerts....
// Full Notification looks like:
// {
//   "newPaIds": "[\"126774/TEL/2020\",\"CDN/20/0111\"]",
//   "notification": {
//     "body": "Click here to see details",
//     "e": "1",
//     "title": "2 new planning applications near you this week."
//   }
// }
//  - They are received from index.js .setBackgroundMessageHandler (Async Storage)
//  - Notification content doesn't actually matter. It comes from Graph query
//  - They're just a signal to focus map on PAs when app first becomes active after notification
//  - They're stored in Async storage as mostly they'll be accepted from the background handler.

/**
 * App state updates when app comes to foreground / background
 */
const AppStateContext = createContext<AppStateStatus>("active");
export const useAppState = () => useContext(AppStateContext);

/**
 * Initialise the app.
 * Setup listeners
 * Hide boot screen etc.
 * @constructor
 */
export function App(): React.ReactFragment {
  const [appState, setAppState] = useState<AppStateStatus>("active");
  useEffect(() => {
    RNBootSplash.hide();
  });

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    // Note this is for foreground messages only. Background ones handled in index.js
    return messaging().onMessage(async remoteMessage => {
      const message = JSON.stringify(remoteMessage);
      console.log("FCM onMessage:", message);
      AsyncStorage.setItem("messages", message);
    });
  }, []);

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    setAppState(nextAppState);
    console.log("App state change");
    const messages = await AsyncStorage.getItem("messages");
    console.log("MEssages on change", messages);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={myTheme}>
        <AppStateContext.Provider value={appState}>
          <AuthProvider>
            <GraphQLProvider>
              <AppNavigator />
            </GraphQLProvider>
          </AuthProvider>
        </AppStateContext.Provider>
      </ApplicationProvider>
    </>
  );
}
