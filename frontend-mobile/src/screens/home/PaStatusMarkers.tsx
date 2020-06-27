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

interface PaStatusMarkersProps {
  location: geography;
  focusPa: (pa: any) => void; // TODO: Use pa type from gql somehow?
  focusedPa: any;
  mapRef: any;
}
export function PaStatusMarkers({
  location,
  focusPa,
  focusedPa,
  mapRef
}: PaStatusMarkersProps) {
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

  // https://stackoverflow.com/questions/39575037/zoom-to-specified-markers-react-native-maps
  // TODO: This effect doesn't always fire when app state changes / map viewed. Hence focus doesn't work.
  useEffect(() => {
    console.log("pastatusmarkers useEffect");
    (async () => {
      if (!openPaData) return;
      const messages = await AsyncStorage.getItem("messages");
      console.log("pastatusmarkers useEffect msgs", messages);
      AsyncStorage.removeItem("messages");
      if (messages) {
        const markers = openPaData.pa_status
          .filter(pa => compareAsc(parseISO(pa.updated_at), minDate) > -1)
          .map(pa => pa.id);

        if (mapRef && markers.length > 0) {
          console.log("fitToSuppliedMarkers", markers);
          mapRef.current.fitToSuppliedMarkers(markers, { animated: true });
        }
      }
    })();
  }, [mapRef, openPaData]);

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
