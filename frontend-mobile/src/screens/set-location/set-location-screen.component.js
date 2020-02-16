import React, { useContext } from "react";
import { Button, Icon, Layout, Spinner, Text } from "@ui-kitten/components";
import { AuthContext } from "../auth/auth-provider.component";
import { useMutation } from "@apollo/react-hooks";
import * as queries from "../../data-layer/graphql-queries";
import Geolocation from "react-native-geolocation-service";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Platform } from "react-native";

const NavigationIcon = style => <Icon {...style} name="navigation-2-outline" />;

export function SetLocationScreen() {
  const { auth } = useContext(AuthContext);
  const [updateUserLocation, { loading, error, data }] = useMutation(
    queries.UPDATE_USER_LOCATION
  );

  const getLocation = async () => {
    let permissionResult;
    if (Platform.OS === "ios") {
      console.log("Doing iOS perms check");
      permissionResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionResult = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
    }

    switch (permissionResult) {
      case RESULTS.UNAVAILABLE:
      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
        console.log("Probs getting location permission", permissionResult);
        break;
      case RESULTS.GRANTED:
        console.log("Location permission is granted");
        Geolocation.getCurrentPosition(
          position => {
            console.log("GEOLOCATION SUCCESS", position);
            updateUserLocation({
              variables: {
                id: auth.userInfo.sub,
                location: {
                  type: "Point",
                  coordinates: [
                    position.coords.latitude,
                    position.coords.longitude
                  ]
                }
              }
            });
          },
          error => {
            // See error code charts below.
            console.log("GEOLOCATION FAIL", error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        break;
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Text status="danger">{error.message}</Text>;
  return (
    <Layout>
      <Text category="h3">
        Welcome to Planning Alerts. Alpha. This needs styling for a start.
      </Text>
      <Text category="h3">Let's get started!</Text>
      <Button onPress={getLocation} icon={NavigationIcon}>
        Get Location
      </Button>
      <Text>Data: {JSON.stringify(data, null, 2)}</Text>
    </Layout>
  );
}
