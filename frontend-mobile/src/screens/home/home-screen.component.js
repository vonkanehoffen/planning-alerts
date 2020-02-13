import React from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { UserLocationMap } from "./user-location-map.component";
import MapTestComponent from "./map-test.component";

export function HomeScreen({ navigation }) {
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
