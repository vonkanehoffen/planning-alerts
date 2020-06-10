import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout, useTheme, Spinner } from "@ui-kitten/components";
import { UserLocationMap } from "./UserLocationMap";
import { FCMSetup } from "../../data-layer/FCMSetup";
import { useApolloNetworkStatus } from "react-apollo-network-status";
import { useGet_User_MetaQuery } from "../../generated/graphql";
import { useAuth } from "../auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { FullScreenLoader } from "../../components/FullScreenLoader";

export function HomeScreen() {
  const status = useApolloNetworkStatus();
  const navigation = useNavigation();
  const { credentials } = useAuth();
  const { loading, error, data } = useGet_User_MetaQuery({
    variables: {
      id: credentials.claims.sub
    }
  });
  // TODO: Show / redirect to council / onboarding stuff if not set on user here.

  if (loading) return <FullScreenLoader />;

  if (!data?.users[0].council) {
    navigation.navigate("Council");
    return <View />;
  }

  if (!data?.users[0].location) {
    navigation.navigate("Set Location");
    return <View />;
  }

  return (
    <Layout style={styles.container}>
      <FCMSetup />
      <UserLocationMap />
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
