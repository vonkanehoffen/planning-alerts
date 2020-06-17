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
import theme from "./src/theme.json";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { GraphQLProvider } from "./src/data-layer/GraphQLProvider";
import { AuthProvider } from "./src/screens/auth/AuthProvider";
import messaging, {
  FirebaseMessagingTypes
} from "@react-native-firebase/messaging";
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

type MessageData = { [key: string]: string };
export type MessageContext = Array<MessageData>;

const MessageContext = createContext<MessageContext>([]);

export const useFCMessages = () => useContext(MessageContext);

/**
 * Initialise the app.
 * Setup listeners
 * Hide boot screen etc.
 * @constructor
 */
export function App(): React.ReactFragment {
  const [messages, setMessages] = useState<MessageContext>([]);

  useEffect(() => {
    RNBootSplash.hide();
  });

  /**
   * Subscribe to FCM Cloud messages.
   * Note this ony handles foreground messages, i.e. when the app's active.
   * ...hence it can't really be used. Leaving in for now.
   */
  useEffect(() => {
    console.log("App useEffect");
    // TODO: https://reactnative.dev/docs/appstate.html ....to sync up AsyncStorage messages
    // https://stackoverflow.com/questions/40821988/react-native-render-when-app-comes-into-foreground

    return messaging().onMessage(async remoteMessage => {
      console.log("FCM Message:", JSON.stringify(remoteMessage, null, 2));
      if (remoteMessage.data) {
        setMessages(m => [remoteMessage.data as MessageData, ...m]);
      }
    });
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      const currentMessages = await AsyncStorage.getItem("messages");
      if (currentMessages) {
        const m = JSON.parse(currentMessages);
        setMessages(m);
        await AsyncStorage.removeItem("messages");
      }
    }
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <MessageContext.Provider value={messages}>
          <AuthProvider>
            <GraphQLProvider>
              <AppNavigator />
            </GraphQLProvider>
          </AuthProvider>
        </MessageContext.Provider>
      </ApplicationProvider>
    </>
  );
}
