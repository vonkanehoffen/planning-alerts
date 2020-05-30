import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout, useTheme, Spinner } from "@ui-kitten/components";
import { UserLocationMap } from "./UserLocationMap";
import { FCMSetup } from "../../data-layer/FCMSetup";
import { useApolloNetworkStatus } from "react-apollo-network-status";

export function HomeScreen({ navigation }: any) { // TODO: can this be useNavigation?
  const status = useApolloNetworkStatus();

  return (
    <Layout style={styles.container}>
      <FCMSetup />
      <UserLocationMap navigation={navigation} />
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
  loading: {
    position: "absolute",
    top: 10,
    right: 10
  }
});
