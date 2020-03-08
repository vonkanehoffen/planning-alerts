import React, { useEffect, useContext } from "react";
import { Text } from "@ui-kitten/components";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { requestNotifications } from "react-native-permissions";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../screens/auth/auth-provider.component";
import * as queries from "./graphql-queries";
import Snackbar from 'react-native-snackbar';
import DeviceInfo from 'react-native-device-info';

/**
 * Get FCM token and store with user record in Hasura
 * Permission has to be asked on iOS, with some weirdness.
 * @see https://github.com/invertase/react-native-firebase/issues/2657#issuecomment-572922981
 * @returns {*}
 * @constructor
 */
export function FCMSetup() {
  const { credentials } = useContext(AuthContext);
  const [upsertFCMToken, { data }] = useMutation(queries.UPSERT_FCM_TOKEN);
  useEffect(() => {
    async function registerForPushNotifications() {
      // TODO: Is this still a bit shaky on iOS? Seems ok on fresh install, but saw error on second run:
      // Error: [messaging/unknown] The operation couldn't be completed. (com.firebase.iid error 1001.)
      // See https://github.com/invertase/react-native-firebase/issues/2657
      // This is after initial perms have been requested and the token has been saved tho so.... maybe ok?
      // TODO: These tokens will stack up for a user in the back end as they get refreshed. How do we determine new
      //  devices vs new tokens for an existing device?
      //  Look at https://github.com/react-native-community/react-native-device-info
      console.log("DOING registerForPushNotifications");
      const device_id = DeviceInfo.getUniqueId();
      console.log('unique ID = ', device_id);
      try {
        console.log("DOING requestPermission");
        await messaging().requestPermission();
        console.log("DOING requestNotifications");
        await requestNotifications(["alert", "badge", "sound"]);

        console.log("DOING getToken");
        const token = await messaging().getToken();

        console.log("GOT TOKEN", token); // TODO: This shouldn't block the ui
        // TODO: This ain't firing on iOS
        upsertFCMToken({
          variables: {
            user_id: credentials.claims.sub,
            token,
            device_id
          }
        });
        Snackbar.show({
          text: "Saved FCM Token",
          duration: Snackbar.LENGTH_SHORT
        });

        const onTokenRefreshListenerRef = messaging().onTokenRefresh(token => {
          if (token) {
            upsertFCMToken({
              variables: {
                user_id: credentials.claims.sub,
                token
              }
            });
          }
        });
      } catch (error) {
        // TODO: Handle error
        Snackbar.show({
          text: `registerForPushNotifications error: ${error.message}`,
          duration: Snackbar.LENGTH_SHORT
        });
        console.log("registerForPushNotifications", error);
      }
    }

    registerForPushNotifications();
  }, []);

  return <Text>FCM Init....</Text>;
}
