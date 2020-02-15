import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AsyncStorage, PushNotificationIOS } from "react-native";
import { Text } from "@ui-kitten/components";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { requestNotifications } from "react-native-permissions";

export function FCMSetup() {
  useEffect(() => {
    async function checkPermission() {
      console.log("START requestNotifications");
      const res = await requestNotifications(["alert", "badge", "sound"]);
      console.log("END requestNotifications", res);
      console.log("CHECKING FCM PERMISSION");
      const enabled = await messaging().hasPermission();
      console.log("FINISHED HASPERMISSION");
      if (enabled) {
        console.log("YA");
        getToken();
      } else {
        requestPermission();
      }
    }

    //3
    async function getToken() {
      // let fcmToken = await AsyncStorage.getItem('fcmToken');
      let fcmToken = false;
      if (!fcmToken) {
        console.log("GETTING FCM TOKEN");
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log("GOT FCM TOKEN", fcmToken);
          // await AsyncStorage.setItem('fcmToken', fcmToken);
        } else {
          console.log("FCM TOKEN FALSE");
        }
      }
    }

    //2
    async function requestPermission() {
      console.log("REQUSETPERMISSION");
      try {
        await messaging().requestPermission();
        // User has authorised
        await getToken();
      } catch (error) {
        // User has rejected permissions
        console.log("permission rejected");
      }
    }

    checkPermission();
  }, []);

  return <Text>FCM Init....</Text>;
}
