import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import * as queries from "../../data-layer/graphql-queries";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Layout, Text, Spinner } from "@ui-kitten/components";
import { PaStatusMarkers } from "./pa-status-markers.component";
import _ from "lodash";
import { AuthContext } from "../auth/auth-provider.component";
import { StyleSheet, View } from "react-native";

export function UserLocationMap({ navigation }) {
  const { auth } = useContext(AuthContext);
  const { loading, error, data } = useQuery(queries.GET_USER_LOCATION, {
    variables: {
      id: auth.userInfo.sub
    }
  });
  const [mapViewLocation, setMapViewLocation] = useState(null);

  console.log("RENDER USERLOC", { loading, error, data });
  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Text status="danger">{error.message}</Text>
      </Layout>
    );
  }

  /**
   * Update location gql query param with new map region, when dragged.
   * @param region
   */
  const handleRegionChange = region => {
    setMapViewLocation({
      type: "Point",
      coordinates: [region.latitude, region.longitude]
    });
  };

  const location = _.get(data, "users[0].location");

  if (!location) {
    navigation.navigate("set-location");
    return false;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.coordinates[0],
          longitude: location.coordinates[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onRegionChangeComplete={handleRegionChange}
      >
        <PaStatusMarkers location={mapViewLocation || location} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
