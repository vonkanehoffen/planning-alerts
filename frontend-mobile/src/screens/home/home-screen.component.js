import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { UserLocationMap } from "./user-location-map.component";
import MapTestComponent from "./map-test.component";
import { requestPermission } from "../../push-notifications/fcm";
import messaging, { firebase } from "@react-native-firebase/messaging";

export function HomeScreen({ navigation }) {
  useEffect(() => {
    async function initFcm() {
      // TODO: Proper permissions request screen
      //  + fix this for iOS. rquestPermission() never resolves.
      //  This is not a thing on Android.
      //  see https://github.com/invertase/react-native-firebase/issues/2657
      //  docs in frontend-mobile/node_modules/@react-native-firebase/messaging/lib/index.d.ts
      //  ...and what's the new iOS12 notifications thing?
      //  http://iosbrain.com/blog/2018/07/05/new-in-ios-12-implementing-provisional-authorization-for-quiet-notifications-in-swift/
      console.log("REQUESTING MESSAGING PERMS");
      const granted = await messaging().requestPermission();

      if (granted) {
        console.log("USER GRANTED MESSAGING PERMISSIONS!");
      } else {
        console.log("USER DECLINED MESSAGING PERMISSIONS :(");
      }

      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log("GOT FCM TOKEN:", fcmToken);
      } else {
        // user doesn't have a device token yet
        console.log("DIDN'T GET FCM TOKEN:", fcmToken);
      }
    }
    initFcm();
  }, []);
  return (
    <Layout style={styles.container}>
      <UserLocationMap navigation={navigation} />
      {/*<MapTestComponent/>*/}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
