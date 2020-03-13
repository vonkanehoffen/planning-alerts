import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import * as queries from "../../data-layer/graphql-queries";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT
} from "react-native-maps";
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

/**
 * Main map view
 *
 * Note there are quirks to react-native-maps
 *
 * showsMyLocationButton={true} on MapView doesn't work reliably.
 * This is a race condition bug: https://github.com/react-native-community/react-native-maps/issues/1033#issuecomment-284531196
 *
 * Google Maps on iOS isn't happy with a controlled region,so it has to be Apple Maps on iOS (default):
 * https://github.com/react-native-community/react-native-maps/issues/1704
 *
 * Initial region doesn't work for Apple Maps.
 * https://github.com/react-native-community/react-native-maps/issues/1677
 * https://github.com/react-native-community/react-native-maps/issues/1338#issuecomment-321532191
 *
 * TODO: So needs to be a class component so refs work and animateToRegion can be used.
 * https://github.com/react-native-community/react-native-maps/issues/1338#issuecomment-351270046
 *
 * @param navigation
 * @returns {boolean|*}
 * @constructor
 */
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
  const [mapReady, setMapReady] = useState(false);

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
    if (mapReady) {
      console.log("handleRegionChange", newRegion);
      setRegion(newRegion);
      setMapViewLocation({
        type: "Point",
        coordinates: [newRegion.latitude, newRegion.longitude]
      });
    }
  };

  const resetRegion = () => {
    console.log("doing reset");
    setRegion(
      regionFrom(userLocation.coordinates[0], userLocation.coordinates[1], 5000)
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

  const userLocation = _.get(data, "users[0].location");

  if (!userLocation) {
    navigation.navigate("Set Location");
    return false;
  }

  const _region =
    region ||
    regionFrom(userLocation.coordinates[0], userLocation.coordinates[1], 5000);
  console.log("_region: ", _region);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={_region}
        onMapReady={() => setMapReady(true)}
        minZoomLevel={12}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <PaStatusMarkers
          location={mapViewLocation || userLocation}
          focusPa={focusPa}
          focusedPa={focusedPa}
        />
        <Marker
          coordinate={postGisToRNMapsLocation(userLocation)}
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
