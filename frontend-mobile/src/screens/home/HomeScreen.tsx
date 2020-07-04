import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useFCMSetup } from "../../data-layer/FCMSetup";
import { useGet_User_MetaQuery } from "../../generated/graphql";
import { useAuth } from "../auth/AuthProvider";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import { CouncilScreen } from "../council/CouncilScreen";
import { SetLocationScreen } from "../set-location/SetLocationScreen";
import { showErrorSnackbar } from "../../utils";
import { PlanningMap } from "./PlanningMap";

export function HomeScreen() {
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

  return <PlanningMap userLocation={data.users_by_pk.location} />;
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
