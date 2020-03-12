import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout, useTheme, Spinner } from "@ui-kitten/components";
import { UserLocationMap } from "./user-location-map.component";
import { FCMSetup } from "../../data-layer/fcm-setup.component";
import { PaLogo } from "../../components/pa-logo.component";
import { useApolloNetworkStatus } from "react-apollo-network-status";

export function HomeScreen({ navigation }) {
  const theme = useTheme();
  const status = useApolloNetworkStatus();

  return (
    <Layout style={styles.container}>
      <FCMSetup />
      <UserLocationMap navigation={navigation} />
      <View style={styles.logo}>
        <PaLogo size={40} color={theme["color-primary-900"]} />
      </View>
      {(status.numPendingQueries > 0 || status.numPendingMutations > 0) && (
        <View style={styles.loading}>
          <Spinner />
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    position: "absolute",
    top: 10,
    left: 10
  },
  loading: {
    position: "absolute",
    top: 10,
    right: 10
  }
});
