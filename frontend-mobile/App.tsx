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

// interface MessageContext {
//   [FirebaseMessagingTypes.RemoteMessage]
// }
const MessageContext = createContext<FirebaseMessagingTypes.RemoteMessage | null>(
  null
);

export const useFCMessage = () => useContext(MessageContext);

export function App(): React.ReactFragment {
  const [messages, setMessages] = useState<any>([]);

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
      setMessages(remoteMessage);
      // We could also.... Update a users messages list using AsyncStorage
    });
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log("_handleAppStateChange", nextAppState);
    if (nextAppState === "active") {
      console.log("doing async get");
      const currentMessages = await AsyncStorage.getItem("messages");
      console.log("current messages = ", currentMessages);
      if (currentMessages) {
        const m = JSON.parse(currentMessages);
        setMessages(m);
        console.log("Loaded messages into state:", m);
      }
    }
    // if (appState.match(/inactive|background/) && nextAppState === "active") {
    //   console.log("App has come to the foreground!");
    //   setMessages()
    // }
    // setAppState(nextAppState);
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
