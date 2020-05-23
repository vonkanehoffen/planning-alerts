import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import * as queries from "../../data-layer/graphql-queries";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Layout, Text } from "@ui-kitten/components";
import { Platform } from "react-native";
import { PaStatusMarkers } from "./pa-status-markers.component";
import _ from "lodash";
import { AuthContext } from "../auth/AuthProvider";
import { StyleSheet, View } from "react-native";
import { postGisToRNMapsLocation, regionFrom } from "../../utils";
import { HomeMarker } from "../../components/home-marker.component";
import { PaStatusDetails } from "../../components/pa-status-details-callout.component";
import FullScreenLoader from "../../components/full-screen-loader.component";
import { useFocusEffect } from "@react-navigation/native";
import NoLocationWarning from "./no-location-warning.component";

let mapRef;

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
 * ... when minZoomLevel={12} is set anyway.
 *
 *
 * animateToRegion is way more reloiable than control via props.
 * https://github.com/react-native-community/react-native-maps/issues/1338#issuecomment-351270046
 *
 *
 * @param navigation
 * @returns {boolean|*}
 * @constructor
 */
export function UserLocationMap({ navigation }) {
  // Get user location
  const { credentials } = useContext(AuthContext);
  const { loading, error, data } = useQuery(queries.GET_USER_LOCATION, {
    variables: {
      id: credentials.claims.sub
    }
  });
  const userLocation = _.get(data, "users[0].location");
  const userRegion =
    userLocation &&
    regionFrom(userLocation.coordinates[0], userLocation.coordinates[1], 5000);

  // Local state
  const [mapReady, setMapReady] = useState(false);
  const [mapViewLocation, setMapViewLocation] = useState(null);
  const [focusedPa, setfocusedPa] = useState(null);

  // Reset map region on view focus.
  // TODO: Still really dodgy...
  // Unreliable location marker & position updates across both platforms.
  // Sometimes works when js is hot reloaded... not when fully. No idea.
  // https://github.com/vonkanehoffen/planning-alerts/issues/22
  useFocusEffect(
    React.useCallback(() => {
      // const task = InteractionManager.runAfterInteractions(() => {
      console.log("FOCUS MAP");
      resetRegion();
      // });
      // return () => task.cancel();
    }, [])
  );

  // Actions
  const resetRegion = () => {
    if (userRegion && mapRef) {
      // console.log("doing reset", userRegion);
      mapRef.animateToRegion(userRegion);
    } else {
      console.log("map not ready. Not resetting.");
    }
  };

  /**
   * Update location gql query param with new map region, when dragged.
   * @param region
   */
  const handleRegionChange = newRegion => {
    // console.log("handleRegionChange", newRegion);
    setMapViewLocation({
      type: "Point",
      coordinates: [newRegion.latitude, newRegion.longitude]
    });
  };

  /**
   * Focus on a planning application
   * Opens details when map marker clicked
   * TODO: Control map position here
   * @param pa
   */
  const focusPa = pa => {
    console.log("focusPa", pa);
    setfocusedPa(pa);
  };

  const unFocusPa = () => setfocusedPa(null);

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

  if (!userLocation) {
    navigation.navigate("Set Location");
    return <NoLocationWarning />;
  }

  // console.log("USER REGION: ", userRegion);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        initialRegion={userRegion}
        ref={el => (mapRef = el)}
        style={styles.map}
        onMapReady={() => {
          // setMapReady(true);
          console.log("MAP READY");
          setMapReady(true);
          // resetRegion();
        }}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
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
      <PaStatusDetails
        pa={focusedPa}
        unFocusPa={unFocusPa}
        resetRegion={resetRegion}
      />
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
    top: Platform.OS === "ios" ? 50 : 10,
    left: 10
  }
});
