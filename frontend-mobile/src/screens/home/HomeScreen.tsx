import React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";
import { UserLocationMap } from "./UserLocationMap";
import { useFCMSetup } from "../../data-layer/FCMSetup";
import { useApolloNetworkStatus } from "react-apollo-network-status";
import { useGet_User_MetaQuery } from "../../generated/graphql";
import { useAuth } from "../auth/AuthProvider";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import { CouncilScreen } from "../council/CouncilScreen";
import { SetLocationScreen } from "../set-location/SetLocationScreen";
import { showErrorSnackbar } from "../../utils";

export function HomeScreen() {
  const status = useApolloNetworkStatus();
  const { credentials } = useAuth();
  const fcm = useFCMSetup();
  const { loading, error, data } = useGet_User_MetaQuery({
    variables: {
      id: credentials.claims.sub
    }
  });

  if (loading) return <FullScreenLoader message="Loading user details" />;

  if (error) {
    showErrorSnackbar(`useGet_User_MetaQuery error: ${error.message}`);
  }

  // Note redirect with navigation.navigate("Council") doesn't work here for some reason. Hence...
  if (!data?.users_by_pk?.council) {
    return <CouncilScreen />;
  }

  if (!data.users_by_pk.location?.coordinates) {
    return <SetLocationScreen />;
  }

  // Everything is cool and we have a user location. Show the map...
  return (
    <Layout style={styles.container}>
      <UserLocationMap userLocation={data.users_by_pk.location} />
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
