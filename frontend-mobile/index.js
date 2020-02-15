/**
 * @format
 */

import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { App } from "./src/App";
import { name as appName } from "./app.json";
import { listenBackgroundMessages } from "./src/push-notifications/fcm";

listenBackgroundMessages();

AppRegistry.registerComponent(appName, () => App);
