import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import * as queries from "../../data-layer/graphql-queries";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Layout, Text, Spinner } from "@ui-kitten/components";
import { PaStatusMarkers } from "./pa-status-markers.component";
import _ from "lodash";
import { AuthContext } from "../auth/auth-provider.component";
import { StyleSheet, View } from "react-native";
import { postGisToRNMapsLocation } from "../../utils";
import { HomeMarker } from "../../components/home-marker.component";
import { PaStatusDetails } from "../../components/pa-status-details-callout.component";
import FullScreenLoader from "../../components/full-screen-loader.component";

export function UserLocationMap({ navigation }) {
  const { credentials } = useContext(AuthContext);
  const { loading, error, data } = useQuery(queries.GET_USER_LOCATION, {
    variables: {
      id: credentials.claims.sub
    }
  });
  const [mapViewLocation, setMapViewLocation] = useState(null);
  const [focusedPa, setfocusedPa] = useState(null);

  if (loading) {
    return <FullScreenLoader message="Loading Map" />;
  }

  if (error) {
    return (
      <Layout>
        <Text status="danger">UserLocationMap error: {error.message}</Text>
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

  /**
   * Focus on a planning application
   * Opens details when map marker clicked
   * TODO: Control map position here
   * @param pa
   */
  const focusPa = pa => {
    setfocusedPa(pa);
  };

  const unFocusPa = () => setfocusedPa(null);

  const location = _.get(data, "users[0].location");

  if (!location) {
    navigation.navigate("Set Location");
    return false;
  }
  // Note: showsMyLocationButton={true} on MapView doesn't work reliably.
  // This is a race condition bug: https://github.com/react-native-community/react-native-maps/issues/1033#issuecomment-284531196
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
        minZoomLevel={12}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={postGisToRNMapsLocation(location)}
          title="You"
          tracksViewChanges={false}
        >
          <HomeMarker />
        </Marker>
        <PaStatusMarkers
          location={mapViewLocation || location}
          focusPa={focusPa}
          focusedPa={focusedPa}
        />
      </MapView>
      {focusedPa !== null && (
        <PaStatusDetails pa={focusedPa} unFocusPa={unFocusPa} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
