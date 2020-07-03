import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { postGisToRNMapsLocation, regionFrom, toObject } from "../../utils";
import {
  useGet_Open_Pa_Near_PointLazyQuery,
  useGet_Recent_Closed_Pa_Near_PointLazyQuery
} from "../../generated/graphql";
import { compareAsc, formatISO, parseISO, subDays } from "date-fns";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import { HomeMarker } from "../../components/HomeMarker";
import { MapMarker } from "./MapMarker";
import { PaStatusDetails } from "./PaStatusDetails";

interface PlanningMapProps {
  userLocation: geography;
}

type PaDataObject = { [index: string]: any }; // TODO: Actual PA

// Do we really need to refactor the whole thing?

export const PlanningMap: React.FC<PlanningMapProps> = ({ userLocation }) => {
  const mapRef = useRef(null);

  // PA Data request hooks
  const [
    getOpenPa,
    { error: openPaError, data: openPaQueryData }
  ] = useGet_Open_Pa_Near_PointLazyQuery();

  const [
    getClosedPa,
    { error: closedPaError, data: closedPaQueryData }
  ] = useGet_Recent_Closed_Pa_Near_PointLazyQuery();

  // Min date to show closed PAs
  const minDate = subDays(new Date(), 8);
  const minDateFormatted = formatISO(minDate, { representation: "date" });
  const distance = 3000; // Search radius

  // Get PAs near user location
  useEffect(() => {
    getOpenPa({
      variables: {
        point: userLocation,
        distance
      }
    });
    getClosedPa({
      variables: {
        point: userLocation,
        distance,
        minDate: minDateFormatted
      }
    });
  }, [userLocation]);

  // Accumulated PA records from above Apollo requests in local state
  // We don't want to lose data from previous search positions.
  const [openPaData, setOpenPaData] = useState<PaDataObject>({});
  const [closedPaData, setClosedPaData] = useState<PaDataObject>({});

  useEffect(() => {
    setOpenPaData(value => ({
      ...value,
      ...toObject(openPaQueryData?.pa_status)
    }));
  }, [openPaQueryData]);

  useEffect(() => {
    setClosedPaData(value => ({
      ...value,
      ...toObject(closedPaQueryData?.pa_status)
    }));
  }, [closedPaQueryData]);

  // Query at new location when map is moved
  const handleRegionChange = (newRegion: Region) => {
    const point = {
      type: "Point",
      coordinates: [newRegion.latitude, newRegion.longitude]
    };
    getOpenPa({
      variables: {
        point,
        distance
      }
    });
    getClosedPa({
      variables: {
        point,
        distance,
        minDate: minDateFormatted
      }
    });
  };

  // TODO: On load focus on new markers from notification. See old code

  // PA currently focused by user
  const [focusedPaId, setFocusedPaId] = useState("");

  // Build Map Markers
  const openMarkers = useMemo(
    () =>
      Object.keys(openPaData).map(id => (
        <MapMarker
          pa={openPaData[id]}
          status={
            compareAsc(parseISO(openPaData[id].updated_at), minDate) <= -1
              ? "open"
              : "new"
          }
          key={id}
          setFocusedPaId={setFocusedPaId}
        />
      )),
    [openPaData]
  );

  const closedMarkers = useMemo(
    () =>
      Object.keys(closedPaData).map(id => (
        <MapMarker
          pa={closedPaData[id]}
          status="closed"
          key={id}
          setFocusedPaId={setFocusedPaId}
        />
      )),
    [closedPaData]
  );

  // Initial region for map on mount
  const initialRegion = regionFrom(
    userLocation.coordinates[0],
    userLocation.coordinates[1],
    3000
  );

  // Position map over user home location
  const resetRegion = () => {
    // @ts-ignore
    mapRef?.current.animateToRegion(initialRegion);
  };

  // Close details callout
  const unFocusPa = () => setFocusedPaId("");

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        ref={mapRef}
        style={styles.map}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
        // minDelta={0.0017} ...doesn't work. Bug?
        maxZoomLevel={18}
        // minZoomLevel={12} // Breaks initialRegion on iOS. https://github.com/react-native-community/react-native-maps/issues/3338
      >
        {closedMarkers}
        {openMarkers}
        <Marker
          coordinate={postGisToRNMapsLocation(userLocation)}
          title="You"
          tracksViewChanges={false}
        >
          <HomeMarker />
        </Marker>
      </MapView>
      <PaStatusDetails
        pa={openPaData[focusedPaId] || closedPaData[focusedPaId]}
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
