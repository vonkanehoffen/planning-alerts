import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { UserLocationMap } from "./user-location-map.component";
import MapTestComponent from "./map-test.component";
import { FCMSetup } from "../../data-layer/fcm-setup.component";

export function HomeScreen({ navigation }) {
  return (
    <Layout style={styles.container}>
      <FCMSetup />
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
