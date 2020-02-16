import React, { useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AsyncStorage, PushNotificationIOS } from "react-native";
import { Text } from "@ui-kitten/components";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { requestNotifications } from "react-native-permissions";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../screens/auth/auth-provider.component";
import * as queries from "./graphql-queries";

/**
 * Get FCM token and store with user record in Hasura
 * Permission has to be asked on iOS, with some weirdness.
 * @see https://github.com/invertase/react-native-firebase/issues/2657#issuecomment-572922981
 * @returns {*}
 * @constructor
 */
export function FCMSetup() {
  const { auth } = useContext(AuthContext);
  const [upsertFCMToken, { data }] = useMutation(queries.UPSERT_FCM_TOKEN);
  useEffect(() => {
    async function registerForPushNotifications() {
      try {
        await messaging().requestPermission();
        await requestNotifications(["alert", "badge", "sound"]);

        const token = await messaging().getToken();
        upsertFCMToken({
          variables: {
            user_id: auth.userInfo.sub,
            token
          }
        });

        const onTokenRefreshListenerRef = messaging().onTokenRefresh(token => {
          if (token) {
            upsertFCMToken({
              variables: {
                user_id: auth.userInfo.sub,
                token
              }
            });
          }
        });
      } catch (error) {
        // TODO: Handle error
        console.error("registerForPushNotifications", error);
      }
    }

    registerForPushNotifications();
  }, []);

  return <Text>FCM Init....</Text>;
}
