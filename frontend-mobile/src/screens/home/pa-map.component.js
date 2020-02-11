import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as queries from '../../data-layer/graphql-queries';
import { Spinner, Layout, Text } from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks'
import { subDays, formatISO } from 'date-fns';

export function PaMap ({ userLocation }) {
  const [region, setRegion] = React.useState({
    latitude: userLocation.coordinates[0],
    longitude: userLocation.coordinates[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [queryLocation, setQueryLocation] = React.useState(userLocation);
  const minDate = formatISO(subDays(new Date(), 3), { representation: 'date' });

  const {
    loading: openPaLoading,
    error: openPaError,
    data: openPaData
  } = useQuery(queries.GET_OPEN_PA_NEAR_POINT, {
    variables: {
      point: queryLocation,
      distance: 2000
    }
    // skip: !userLocation
  });

  const {
    loading: closedPaLoading,
    error: closedPaError,
    data: closedPaData
  } = useQuery(queries.GET_RECENT_CLOSED_PA_NEAR_POINT, {
    variables: {
      point: queryLocation,
      distance: 2000,
      minDate: minDate
    }
  });

  if (openPaLoading || closedPaLoading) {
    return <Layout><Spinner/></Layout>;
  }

  if (openPaError || closedPaError) {
    return (
      <Layout>
        <Text statu="danger">{openPaError} {closedPaError}</Text>
      </Layout>
    );
  }

  console.log({
    openPaData,
    closedPaData,
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        onRegionChange={setRegion}
      >
        {closedPaData.pa_status.map(pa => (
          <Marker
            coordinate={{
              latitude: pa.location.coordinates[0],
              longitude: pa.location.coordinates[1]
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
              longitude: pa.location.coordinates[1]
            }}
            key={pa.id}
            title={pa.id}
            description={pa.proposal}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
