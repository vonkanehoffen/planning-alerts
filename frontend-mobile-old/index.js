/**
 * @format
 */

import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { App } from "./App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";

/**
 * Handle notifications while app is in background.
 * Note this fn won't see the React component tree, hence we add this data to
 * AsyncStorage for processing later.
 * Also see onMessage in App.js
 */
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background:", remoteMessage);
  const currentMessages = await AsyncStorage.getItem("messages");
  const messageArray = currentMessages ? JSON.parse(currentMessages) : [];
  messageArray.push(remoteMessage.data);
  await AsyncStorage.setItem("messages", JSON.stringify(messageArray));
});

AppRegistry.registerComponent(appName, () => App);
