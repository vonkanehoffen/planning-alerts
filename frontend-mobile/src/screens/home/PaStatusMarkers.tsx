import React from "react";
import { Callout, Marker } from "react-native-maps";
import { subDays, formatISO, compareAsc, parseISO } from "date-fns";
import { postGisToRNMapsLocation } from "../../utils";
import { PaMarker } from "./PaMarker";
import {
  useGet_Open_Pa_Near_PointQuery,
  useGet_Recent_Closed_Pa_Near_PointQuery
} from "../../generated/graphql";

interface PaStatusMarkersProps {
  location: geography;
  focusPa: (pa: any) => void; // TODO: Use pa type from gql somehow?
  focusedPa: any;
}
export function PaStatusMarkers({
  location,
  focusPa,
  focusedPa
}: PaStatusMarkersProps) {
  const {
    error: openPaError,
    data: openPaData
  } = useGet_Open_Pa_Near_PointQuery({
    variables: {
      point: location,
      distance: 2000
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
      distance: 2000,
      minDate: minDateFormatted
    }
  });

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
