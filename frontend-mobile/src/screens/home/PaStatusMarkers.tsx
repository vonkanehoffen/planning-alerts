import React, { useEffect } from "react";
import { Marker } from "react-native-maps";
import { subDays, formatISO, compareAsc, parseISO } from "date-fns";
import { postGisToRNMapsLocation } from "../../utils";
import { PaMarker } from "./PaMarker";
import {
  useGet_Open_Pa_Near_PointQuery,
  useGet_Recent_Closed_Pa_Near_PointQuery
} from "../../generated/graphql";
import AsyncStorage from "@react-native-community/async-storage";
import { useAppState } from "../../../App";

interface PaStatusMarkersProps {
  location: geography;
  focusPa: (pa: any) => void; // TODO: Use pa type from gql somehow?
  focusedPa: any;
  mapRef: any;
}

/**
 * - Draw markers on the UserLocationMap
 * - Handle focusing map on selected PA
 * - Focus on new PAs following notification
 *
 * @param location
 * @param focusPa
 * @param focusedPa
 * @param mapRef
 * @constructor
 */
export function PaStatusMarkers({
  location,
  focusPa,
  focusedPa,
  mapRef
}: PaStatusMarkersProps) {
  const appState = useAppState();
  const {
    error: openPaError,
    data: openPaData
  } = useGet_Open_Pa_Near_PointQuery({
    variables: {
      point: location,
      distance: 3000
    }
    // skip: !location
  });

  const minDate = subDays(new Date(), 8);
  const minDateFormatted = formatISO(minDate, { representation: "date" });
  const {
    error: closedPaError,
    data: closedPaData
  } = useGet_Recent_Closed_Pa_Near_PointQuery({
    variables: {
      point: location,
      distance: 3000,
      minDate: minDateFormatted
    }
  });

  /**
   * Focus on new PAs following notification
   * This looks for presence of message in async storage, then removes it as focus takes place.
   * The relevant Apollo query is also updated...somehow? Not sure which hook is doing that but it seems to work.
   * TODO: Fully focus to show details when it's just one new PA.
   */
  useEffect(() => {
    (async () => {
      if (appState === "active" && openPaData) {
        const messages = await AsyncStorage.getItem("messages");
        console.log("pastatusmarkers useEffect msgs", messages);
        AsyncStorage.removeItem("messages");
        if (messages) {
          const markers = openPaData.pa_status
            .filter(pa => compareAsc(parseISO(pa.updated_at), minDate) > -1)
            .map(pa => pa.id);

          if (mapRef && markers.length > 0) {
            console.log("fitToSuppliedMarkers", markers);
            mapRef.current.fitToSuppliedMarkers(markers, {
              // edgePadding: { // This does bugger all. Bug?
              //   top: 2000,
              //   right: 2000,
              //   bottom: 2000,
              //   left: 2000,
              // },
              animated: true
            });
            // TODO: Focus it if there's only one new PA...
          }
        }
      }
    })();
  }, [mapRef, openPaData, appState]);

  // // TODO: error display for this further up the tree.
  // if (openPaError || closedPaError) {
  //   return false;
  //   // return (
  //   //   <Layout>
  //   //     <Text statu="danger">
  //   //       {openPaError} {closedPaError}
  //   //     </Text>
  //   //   </Layout>
  //   // );
  // }

  // console.log("PA STATUS MARKERS RESPONSES ---- ", JSON.stringify({openPaData, closedPaData}, null, 2));

  const MapMarker = ({ pa, status }: any) => (
    <Marker
      coordinate={postGisToRNMapsLocation(pa.location)}
      onPress={() => {
        console.log(`PRESSED ${status} MARKER`);
        focusPa(pa);
      }}
      tracksViewChanges={false}
      identifier={pa.id}
    >
      <PaMarker status={status} focused={pa.id === focusedPa?.id} />
    </Marker>
  );

  const newMarkers = openPaData?.pa_status
    .filter(pa => compareAsc(parseISO(pa.updated_at), minDate) > -1)
    .map(pa => <MapMarker pa={pa} status="new" key={pa.id} />);

  const openMarkers = openPaData?.pa_status
    .filter(pa => compareAsc(parseISO(pa.updated_at), minDate) <= -1)
    .map(pa => <MapMarker pa={pa} status="open" key={pa.id} />);

  const closedMarkers = closedPaData?.pa_status.map(pa => (
    <MapMarker pa={pa} status="closed" key={pa.id} />
  ));

  return (
    <>
      {newMarkers}
      {openMarkers}
      {closedMarkers}
    </>
  );
}
