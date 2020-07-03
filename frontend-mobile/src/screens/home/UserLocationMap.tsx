import React, { useRef, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import { Platform } from "react-native";
import { PaStatusMarkers } from "./PaStatusMarkers";
import { StyleSheet, View } from "react-native";
import { postGisToRNMapsLocation, regionFrom } from "../../utils";
import { HomeMarker } from "../../components/HomeMarker";
import { PaStatusDetails } from "./PaStatusDetails";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Pa_Status } from "../../generated/graphql";

interface UserLocationMapProps {
  userLocation: geography;
}
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
export const UserLocationMap: React.FC<UserLocationMapProps> = ({
  userLocation
}) => {
  const mapRef = useRef(null);

  const userRegion = regionFrom(
    userLocation.coordinates[0],
    userLocation.coordinates[1],
    3000
  );

  // Local state
  const [mapViewLocation, setMapViewLocation] = useState(userLocation);
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
    if (mapRef && userRegion) {
      // console.log("doing reset", userRegion);
      // @ts-ignore
      mapRef.current.animateToRegion(userRegion);
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

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        initialRegion={userRegion}
        ref={mapRef}
        style={styles.map}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
        // minDelta={0.0017} ...doesn't work. Bug?
        maxZoomLevel={18}
        // minZoomLevel={12} // Breaks initialRegion on iOS. https://github.com/react-native-community/react-native-maps/issues/3338
      >
        <PaStatusMarkers
          location={mapViewLocation || userLocation}
          focusPa={focusPa}
          focusedPa={focusedPa}
          mapRef={mapRef}
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
};

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
