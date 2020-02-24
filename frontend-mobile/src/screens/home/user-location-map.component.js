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

export function UserLocationMap({ navigation }) {
  const { credentials } = useContext(AuthContext);
  const { loading, error, data } = useQuery(queries.GET_USER_LOCATION, {
    variables: {
      id: credentials.claims.sub
    }
  });
  const [mapViewLocation, setMapViewLocation] = useState(null);
  const [focussedPa, setFocussedPa] = useState(null);

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
    setFocussedPa(pa);
  };

  const unFocusPa = () => setFocussedPa(null);

  const location = _.get(data, "users[0].location");

  if (!location) {
    navigation.navigate("Set Location");
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
        minZoomLevel={12}
        onRegionChangeComplete={handleRegionChange}
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
        />
      </MapView>
      {focussedPa !== null && (
        <PaStatusDetails pa={focussedPa} unFocusPa={unFocusPa} />
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
