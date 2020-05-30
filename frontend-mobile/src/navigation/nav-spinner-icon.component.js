import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Spinner } from "@ui-kitten/components";
import { useApolloNetworkStatus } from "react-apollo-network-status";

// UNUSED.... TODO: Do we want any global apollo loading thing?
export function NavSpinnerIcon() {
  const navigation = useNavigation();
  const status = useApolloNetworkStatus();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Settings")}
      style={styles.container}
    >
      {status.numPendingQueries > 0 || status.numPendingMutations > 0 ? (
        <Spinner />
      ) : (
        <Icon name="settings-outline" width={32} height={32} fill="#3366FF" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10
  }
});
