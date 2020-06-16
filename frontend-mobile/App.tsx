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

const MessageContext = createContext<FirebaseMessagingTypes.RemoteMessage | null>(
  null
);

export const useFCMessage = () => useContext(MessageContext);

export function App(): React.ReactFragment {
  const [
    message,
    setMessage
  ] = useState<FirebaseMessagingTypes.RemoteMessage | null>(null);
  useEffect(() => {
    RNBootSplash.hide();
    /**
     * Subscribe to FCM Cloud messages.
     * Note this ony handles foreground messages, i.e. when the app's active.
     * ...hence it can't really be used. Leaving in for now.
     */
    return messaging().onMessage(async remoteMessage => {
      console.log("FCM Message:", JSON.stringify(remoteMessage, null, 2));
      setMessage(remoteMessage);
      // We could also.... Update a users messages list using AsyncStorage
      // const currentMessages = await AsyncStorage.getItem('messages');
      // const messageArray = JSON.parse(currentMessages);
      // messageArray.push(remoteMessage.data);
      // await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
    });
  }, []);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <MessageContext.Provider value={message}>
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
