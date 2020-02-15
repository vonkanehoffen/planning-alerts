import messaging from "@react-native-firebase/messaging";

export function listenBackgroundMessages() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Message handled in the background!", remoteMessage);
  });
}
