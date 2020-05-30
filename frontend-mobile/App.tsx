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
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { mapping } from "@eva-design/eva";
import theme from "./src/theme.json";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { GraphQLProvider } from "./src/data-layer/GraphQLProvider";
import { AuthProvider } from "./src/screens/auth/AuthProvider";
import messaging from "@react-native-firebase/messaging";
import RNBootSplash from "react-native-bootsplash";

export function App(): React.ReactFragment {
  useEffect(() => {
    RNBootSplash.hide();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("FCM Message Data:", remoteMessage.data);

      // Update a users messages list using AsyncStorage
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
        <AuthProvider>
          <GraphQLProvider>
            <AppNavigator />
          </GraphQLProvider>
        </AuthProvider>
      </ApplicationProvider>
    </>
  );
}
