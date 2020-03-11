import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Icon, Layout, Spinner, Text } from "@ui-kitten/components";
import { AuthContext } from "../auth/auth-provider.component";
import { useMutation } from "@apollo/react-hooks";
import * as queries from "../../data-layer/graphql-queries";
import Geolocation from "react-native-geolocation-service";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Platform, StyleSheet } from "react-native";
import FullScreenLoader from "../../components/full-screen-loader.component";

const NavigationIcon = style => <Icon {...style} name="navigation-2-outline" />;

export function SetLocationScreen({ navigation }) {
  const { credentials } = useContext(AuthContext);
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
          async position => {
            console.log("GEOLOCATION SUCCESS", position);
            await updateUserLocation({
              variables: {
                id: credentials.claims.sub,
                location: {
                  type: "Point",
                  coordinates: [
                    position.coords.latitude,
                    position.coords.longitude
                  ]
                }
              }
            });
            navigation.navigate("Home");
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

  if (loading) return <FullScreenLoader message="Setting Location" />;
  if (error) return <Text status="danger">{error.message}</Text>;
  return (
    <Layout style={styles.container}>
      <View>
        <Text category="h3" style={styles.intro}>
          Welcome to Planning Alerts. It's time to get involved in your local area.
        </Text>
        <Text category="h3">Let's get started!</Text>
      </View>
      <View>
        <Button onPress={getLocation} icon={NavigationIcon}>
          Get Location
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20
  },
  intro: {
    paddingBottom: 20
  }
});
