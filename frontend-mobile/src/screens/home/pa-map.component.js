import React from 'react';
import {StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';
import * as queries from '../../data-layer/graphql-queries';
import {useQuery} from '@apollo/react-hooks';
import {subDays, formatISO} from 'date-fns';

export function PaMap({userLocation}) {

  const {
    loading: openPaLoading,
    error: openPaError,
    data: openPaData,
  } = useQuery(queries.GET_OPEN_PA_NEAR_POINT, {
    variables: {
      point: userLocation,
      distance: 2000,
    },
    // skip: !userLocation
  });

  const minDate = formatISO(subDays(new Date(), 3), {representation: 'date'});
  const {
    loading: closedPaLoading,
    error: closedPaError,
    data: closedPaData,
  } = useQuery(queries.GET_RECENT_CLOSED_PA_NEAR_POINT, {
    variables: {
      point: userLocation,
      distance: 2000,
      minDate: minDate,
    },
  });

  console.log("RENDER PA MAP PINS", { openPaLoading, openPaError, openPaData, closedPaLoading,closedPaError, closedPaData});

  // TODO: Loading and error display for this further up the tree.
  if (openPaLoading || closedPaLoading) {
    return false;
    // return (
    //   <Layout>
    //     <Spinner />
    //   </Layout>
    // );
  }

  if (openPaError || closedPaError) {
    return false;
    // return (
    //   <Layout>
    //     <Text statu="danger">
    //       {openPaError} {closedPaError}
    //     </Text>
    //   </Layout>
    // );
  }

  console.log({
    userLocation,
    openPaData,
    closedPaData,
  });

  return (
    <>
      {closedPaData.pa_status.map(pa => (
        <Marker
          coordinate={{
            latitude: pa.location.coordinates[0],
            longitude: pa.location.coordinates[1],
          }}
          key={pa.id}
          title={pa.id}
          description={pa.proposal}
        />
      ))}
      {openPaData.pa_status.map(pa => (
        <Marker
          coordinate={{
            latitude: pa.location.coordinates[0],
            longitude: pa.location.coordinates[1],
          }}
          key={pa.id}
          title={pa.id}
          description={pa.proposal}
        />
      ))}
    </>
  );
}
