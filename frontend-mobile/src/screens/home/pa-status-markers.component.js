import React from "react";
import { StyleSheet } from "react-native";
import { Callout, Marker } from "react-native-maps";
import * as queries from "../../data-layer/graphql-queries";
import { useQuery } from "@apollo/react-hooks";
import { subDays, formatISO, compareAsc, parseISO } from "date-fns";
import { postGisToRNMapsLocation } from "../../utils";
import {
  PA_CLOSED, PA_NEW,
  PA_OPEN,
  PaMarker,
} from '../../components/pa-marker.component';
import { PaStatusDetails } from "../../components/pa-status-details-callout.component";

export function PaStatusMarkers({ location, focusPa }) {
  const {
    error: openPaError,
    data: openPaData
  } = useQuery(queries.GET_OPEN_PA_NEAR_POINT, {
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
  } = useQuery(queries.GET_RECENT_CLOSED_PA_NEAR_POINT, {
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

  return (
    <>
      {closedPaData &&
        closedPaData.pa_status.map(pa => (
          <Marker
            coordinate={postGisToRNMapsLocation(pa.location)}
            key={pa.id}
            onPress={() => {
              console.log("PRESSED CLOSED MARKER");
              focusPa(pa);
            }}
            tracksViewChanges={false}
          >
            <PaMarker status={PA_CLOSED} />
            {/*<Callout>*/}
            {/*  <PaStatusDetails pa={pa} />*/}
            {/*</Callout>*/}
          </Marker>
        ))}
      {openPaData &&
        openPaData.pa_status.map(pa => (
          <Marker
            coordinate={{
              latitude: pa.location.coordinates[0],
              longitude: pa.location.coordinates[1]
            }}
            key={pa.id}
            onPress={() => {
              console.log("PRESSED OPEN MARKER");
              focusPa(pa);
            }}
            tracksViewChanges={false}
          >
            <PaMarker status={compareAsc(parseISO(pa.updated_at), minDate) > -1 ? PA_NEW : PA_OPEN} />
          </Marker>
        ))}
    </>
  );
}
