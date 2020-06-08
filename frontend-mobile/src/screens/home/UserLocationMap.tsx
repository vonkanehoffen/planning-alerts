import React, { useContext, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import { Layout, Text } from "@ui-kitten/components";
import { Platform } from "react-native";
import { PaStatusMarkers } from "./PaStatusMarkers";
import _ from "lodash";
import { AuthContext } from "../auth/AuthProvider";
import { StyleSheet, View } from "react-native";
import { postGisToRNMapsLocation, regionFrom } from "../../utils";
import { HomeMarker } from "../../components/HomeMarker";
import { PaStatusDetails } from "./PaStatusDetails";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import NoLocationWarning from "./NoLocationWarning";
import { Pa_Status, useGet_User_MetaQuery } from "../../generated/graphql";

let mapRef: any; // TODO: TS - how to type this as optional ref?

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
 * animateToRegion is way more reliable than control via props.
 * https://github.com/react-native-community/react-native-maps/issues/1338#issuecomment-351270046
 *
 *
 * @param navigation
 * @returns {boolean|*}
 * @constructor
 */
export function UserLocationMap() {
  const navigation = useNavigation();
  // Get user location
  const { credentials } = useContext(AuthContext);
  const { loading, error, data } = useGet_User_MetaQuery({
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
  const [mapViewLocation, setMapViewLocation] = useState(
    null as null | geography
  );
  const [focusedPa, setfocusedPa] = useState(null as null | Pa_Status);

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
   */
  const handleRegionChange = (newRegion: Region) => {
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
  const focusPa = (pa: Pa_Status) => {
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
    // navigation.navigate("Set Location");
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
