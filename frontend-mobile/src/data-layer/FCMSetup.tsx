import React, { useEffect, useContext } from "react";
import messaging from "@react-native-firebase/messaging";
import { requestNotifications } from "react-native-permissions";
import { AuthContext } from "../screens/auth/AuthProvider";
import Snackbar from "react-native-snackbar";
import DeviceInfo from "react-native-device-info";
import { useUpsert_Fcm_TokenMutation } from "../generated/graphql";
import { View } from "react-native";

/**
 * Get FCM token and store with user record in Hasura
 * Permission has to be asked on iOS, with some weirdness.
 * @see https://github.com/invertase/react-native-firebase/issues/2657#issuecomment-572922981
 *
 * @returns {*}
 * @constructor
 */
export function useFCMSetup() {
  const { credentials } = useContext(AuthContext);
  const [upsertFCMToken, { data }] = useUpsert_Fcm_TokenMutation();
  useEffect(() => {
    async function registerForPushNotifications() {
      const device_id = DeviceInfo.getUniqueId();
      try {
        await messaging().requestPermission();
        await requestNotifications(["alert", "badge", "sound"]);
        const token = await messaging().getToken();
        const variables = {
          user_id: credentials.claims.sub,
          token,
          device_id
        };
        await upsertFCMToken({
          variables
        });
        // Snackbar.show({
        //   text: "Saved FCM Token",
        //   duration: Snackbar.LENGTH_SHORT
        // });
        console.log("Saved FCM Token", variables);
        const unsubscribe = messaging().onTokenRefresh(token => {
          if (token) {
            upsertFCMToken({
              variables: {
                user_id: credentials.claims.sub,
                token,
                device_id
              }
            });
          }
        });
      } catch (error) {
        Snackbar.show({
          text: `registerForPushNotifications error: ${error.message}`,
          duration: Snackbar.LENGTH_SHORT
        });
        console.log("registerForPushNotifications error:", error);
      }
    }

    registerForPushNotifications();
  }, []);
  return null;
}
