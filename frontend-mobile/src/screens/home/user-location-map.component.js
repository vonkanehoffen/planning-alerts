import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import * as queries from "../../data-layer/graphql-queries";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { PaStatusMarkers } from "./pa-status-markers.component";
import _ from "lodash";
import { AuthContext } from "../auth/auth-provider.component";
import { StyleSheet, View } from "react-native";
import { postGisToRNMapsLocation, regionFrom } from "../../utils";
import { HomeMarker } from "../../components/home-marker.component";
import { PaStatusDetails } from "../../components/pa-status-details-callout.component";
import FullScreenLoader from "../../components/full-screen-loader.component";
import { useFocusEffect } from "@react-navigation/native";
import { PaLogo } from "../../components/pa-logo.component";

export function UserLocationMap({ navigation }) {
  const theme = useTheme();
  // Get user location
  const { credentials } = useContext(AuthContext);
  const { loading, error, data } = useQuery(queries.GET_USER_LOCATION, {
    variables: {
      id: credentials.claims.sub
    }
  });
  const [region, setRegion] = useState(null);

  const [mapViewLocation, setMapViewLocation] = useState(null);
  const [focusedPa, setfocusedPa] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      console.log("FOCUSSSSS MAP");
    }, [])
  );

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
  const handleRegionChange = newRegion => {
    console.log("CHANEG", newRegion);
    setRegion(newRegion);
    setMapViewLocation({
      type: "Point",
      coordinates: [newRegion.latitude, newRegion.longitude]
    });
  };

  const resetRegion = () => {
    console.log("doing reset");
    setRegion(
      regionFrom(location.coordinates[0], location.coordinates[1], 5000)
    );
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
        region={
          region ||
          regionFrom(location.coordinates[0], location.coordinates[1], 5000)
        }
        minZoomLevel={12}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <PaStatusMarkers
          location={mapViewLocation || location}
          focusPa={focusPa}
          focusedPa={focusedPa}
        />
        <Marker
          coordinate={postGisToRNMapsLocation(location)}
          title="You"
          tracksViewChanges={false}
        >
          <HomeMarker />
        </Marker>
      </MapView>
      {focusedPa !== null && (
        <PaStatusDetails pa={focusedPa} unFocusPa={unFocusPa} />
      )}
      <TouchableOpacity style={styles.logo} onPress={resetRegion}>
        <PaLogo size={40} color={theme["color-primary-900"]} />
      </TouchableOpacity>
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
  },
  logo: {
    position: "absolute",
    top: 10,
    left: 10
  }
});
