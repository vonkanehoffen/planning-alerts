import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AppState,
  AppStateStatus,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { postGisToRNMapsLocation, regionFrom, toObject } from "../../utils";
import {
  Pa_Status,
  useGet_Open_Pa_Near_PointLazyQuery,
  useGet_Recent_Closed_Pa_Near_PointLazyQuery,
  useGet_User_Pa_AlertsQuery,
  useSet_User_AlertsMutation,
  User_Pa_Status_Type_Enum
} from "../../generated/graphql";
import { compareAsc, formatISO, parseISO, subDays } from "date-fns";
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import { HomeMarker } from "../../components/HomeMarker";
import { MapMarker } from "./MapMarker";
import { PaDetails } from "./PaDetails";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { ApolloNetworkStatus } from "./ApolloNetworkStatus";
import { useAuth } from "../auth/AuthProvider";
import { LogoFab } from "../../components/LogoFab";

interface PlanningMapProps {
  userLocation: geography;
}

type PaDataObject = { [index: string]: Pa_Status };

// Do we really need to refactor the whole thing?

export const PlanningMap: React.FC<PlanningMapProps> = ({ userLocation }) => {
  const styles = useStyleSheet(themedStyles);
  const mapRef = useRef(null);

  // User PA alerts query
  const { credentials } = useAuth();
  const userPaAlertsQuery = useGet_User_Pa_AlertsQuery({
    variables: {
      user_id: credentials.claims.sub
    }
  });

  // Unset user PA alerts mutation
  const [setUserAlerts] = useSet_User_AlertsMutation();

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
  const isNew = (updated_at: string) =>
    compareAsc(parseISO(updated_at), minDate) > -1;
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

  /**
   * Focus on new PAs following notification
   * This re-fetches the user pa alerts query when app is opened and focuses if alert items are returned:
   * The secondary effect below fires for this - needs to be two stage as focus is reliant on main PA data query.
   *
   * Note FCM background message processing is too unreliable to do this, hence we just trigger on AppState change.
   * Tried lots. Not just dev environment.... don't go there again...
   */
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      console.log("handleAppStateChange", nextAppState);
      if (nextAppState === "active") {
        // TODO: Dodgy? https://github.com/apollographql/react-apollo/issues/3917
        const query = await userPaAlertsQuery.refetch();
      }
    };

    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  });

  // PA currently focused by user
  const [focusedPaId, setFocusedPaId] = useState("");

  // Focus on alert PAs when marker data has loaded.
  useEffect(() => {
    if (userPaAlertsQuery.data?.user_pa_status && openPaQueryData?.pa_status) {
      const markers = userPaAlertsQuery.data.user_pa_status.map(
        s => s.pa_status_id
      );
      console.log("markers", markers);
      if (markers.length > 0) {
        // @ts-ignore
        mapRef.current.fitToSuppliedMarkers(markers, {
          animated: true,
          edgePadding: {
            top: 220,
            right: 220,
            bottom: 220,
            left: 220
          }
        });
      }
      if (markers.length === 1) {
        setFocusedPaId(markers[0]);
      }
      setUserAlerts({
        variables: {
          objects: markers.map(m => ({
            pa_status_id: m,
            status: User_Pa_Status_Type_Enum.Alerted,
            user_id: credentials.claims.sub
          }))
        }
      });
    }
  }, [userPaAlertsQuery.data, openPaQueryData]);

  // Build Map Markers
  const openMarkers = useMemo(
    () =>
      Object.keys(openPaData).map(id => (
        <MapMarker
          pa={openPaData[id]}
          status={isNew(openPaData[id].updated_at) ? "new" : "open"}
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

  // Height of PaDetails when populated, for offsetting the home button.
  const [paDetailsHeight, setPaDetailsHeight] = useState(0);

  // Initial region for map on mount
  const initialRegion = regionFrom(
    userLocation.coordinates[0],
    userLocation.coordinates[1],
    3000
  );

  // Position map over user home location
  const goHome = () => {
    // @ts-ignore
    mapRef?.current.animateToRegion(initialRegion);
    setFocusedPaId("");
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
      <View style={styles.detailCard}>
        {focusedPaId ? (
          <PaDetails
            pa={openPaData[focusedPaId] || closedPaData[focusedPaId]}
            unFocus={unFocusPa}
            setHeight={setPaDetailsHeight}
          />
        ) : (
          <View />
        )}
      </View>
      <ApolloNetworkStatus />
      <TouchableOpacity
        style={{
          ...styles.fab,
          bottom: (focusedPaId ? paDetailsHeight + 85 : 0) + 10
        }}
        onPress={goHome}
      >
        <LogoFab />
      </TouchableOpacity>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  detailCard: {
    width: "100%",
    maxHeight: "60%",
    backgroundColor: "color-basic-800",
    position: "relative"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  logo: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 10,
    left: 10
  },
  fab: {
    position: "absolute",
    right: 10
  }
});
