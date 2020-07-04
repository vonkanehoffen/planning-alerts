import React from "react";
import { useApolloNetworkStatus } from "react-apollo-network-status";
import { StyleSheet, View } from "react-native";
import { Spinner } from "@ui-kitten/components";

export const ApolloNetworkStatus = () => {
  const status = useApolloNetworkStatus();

  return (
    <View style={styles.loading}>
      {(status.numPendingQueries > 0 || status.numPendingMutations > 0) && (
        <Spinner />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: 10,
    right: 10
  }
});
