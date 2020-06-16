/**
 * @format
 */

import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { App } from "./App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", remoteMessage);
  // ...which isn't much use as this fn won't see the React component tree, so we can't act on the data.
  // We could add this data to AsyncStorage (see onMessage in App.js) ...but it's
  // probably better to just set the data in Hasura against the user before
  // sending the message.
});

AppRegistry.registerComponent(appName, () => App);
