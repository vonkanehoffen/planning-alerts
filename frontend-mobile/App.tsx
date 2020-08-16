/**
 * Planning Alerts
 *
 * React Native App
 * https://github.com/facebook/react-native
 *
 * Some parts of the UI Kitten template
 * https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React, { useEffect } from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping } from "@eva-design/eva";
import { myTheme } from "./src/custom-theme";
// import { AppNavigator } from "./src/navigation/AppNavigator";
// import { GraphQLProvider } from "./src/data-layer/GraphQLProvider";
// import { AuthProvider } from "./src/screens/auth/AuthProvider";
// import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from "@react-native-community/async-storage";
import messaging from "@react-native-firebase/messaging";
import { Text } from 'react-native'
import { WelcomeScreen } from './src/screens/auth/WelcomeScreen'

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
 * Initialise the app.
 * Setup listeners
 * Hide boot screen etc.
 * @constructor
 */
export default function App(): React.ReactFragment {
  useEffect(() => {
    // RNBootSplash.hide();
  });

  useEffect(() => {
    // Note this is for foreground messages only. Background ones handled in index.js
    return messaging().onMessage(async remoteMessage => {
      const message = JSON.stringify(remoteMessage);
      console.log("FCM onMessage:", message);
      AsyncStorage.setItem("messages", message);
    });
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={myTheme}>
        <WelcomeScreen doLogin={() => false}/>
        {/*<AuthProvider>*/}
        {/*  <GraphQLProvider>*/}
        {/*    <AppNavigator />*/}
        {/*  </GraphQLProvider>*/}
        {/*</AuthProvider>*/}
      </ApplicationProvider>
    </>
  );
}
