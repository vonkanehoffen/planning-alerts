import React from "react";
import { StyleSheet } from "react-native";
import { Callout, Marker } from "react-native-maps";
import * as queries from "../../data-layer/graphql-queries";
import { useQuery } from "@apollo/react-hooks";
import { subDays, formatISO } from "date-fns";
import { postGisToRNMapsLocation } from "../../utils";
import { PaMarker } from "../../components/pa-marker.component";
import { PaStatusDetails } from "../../components/pa-status-details-callout.component";

export function PaStatusMarkers({ location, focusPa }) {
  const {
    loading: openPaLoading,
    error: openPaError,
    data: openPaData
  } = useQuery(queries.GET_OPEN_PA_NEAR_POINT, {
    variables: {
      point: location,
      distance: 2000
    }
    // skip: !location
  });

  const minDate = formatISO(subDays(new Date(), 3), { representation: "date" });
  const {
    loading: closedPaLoading,
    error: closedPaError,
    data: closedPaData
  } = useQuery(queries.GET_RECENT_CLOSED_PA_NEAR_POINT, {
    variables: {
      point: location,
      distance: 2000,
      minDate: minDate
    }
  });

  console.log("RENDER PA MAP PINS", {
    openPaLoading,
    openPaError,
    openPaData,
    closedPaLoading,
    closedPaError,
    closedPaData
  });

  // // TODO: Loading and error display for this further up the tree.
  // if (openPaLoading || closedPaLoading) {
  //   return false;
  //   // return (
  //   //   <Layout>
  //   //     <Spinner />
  //   //   </Layout>
  //   // );
  // }
  //
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

  console.log({
    location,
    openPaData,
    closedPaData
  });

  // TODO: Custom marker pins. https://github.com/react-native-community/react-native-maps#rendering-a-custom-marker-with-a-custom-callout
  // https://github.com/react-native-community/react-native-maps#custom-callouts
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
          >
            <PaMarker open={false} />
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
          >
            <PaMarker open={true} />
          </Marker>
        ))}
    </>
  );
}
