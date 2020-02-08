import React from "react";
import { useQuery } from "@apollo/react-hooks";
import GoogleMapReact from "google-map-react";
import config from "../../config.json";
import Marker from "./Marker";
import * as queries from "../../gql/queries";
import View from "../../components/View";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import RefreshButton from "../../components/RefreshButton";
import { subDays,formatISO } from 'date-fns';

// TODO: drive queries on map movement (mouse up)
export default function PlanningMap({ userLocation }) {
  const [draggedCenter, setDraggedCenter] = React.useState(false);
  const [location, setLocation] = React.useState(userLocation);
  const minDate = formatISO(subDays(new Date(), 3), { representation: 'date' });

  const {
    loading: openPaLoading,
    error: openPaError,
    data: openPaData
  } = useQuery(queries.GET_OPEN_PA_NEAR_POINT, {
    variables: {
      point: location,
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
      point: location,
      distance: 2000,
      minDate: minDate
    }
  });

  const handleRefresh = () => {
    console.log("referesh");
    setLocation({
      type: "Point",
      coordinates: [draggedCenter.lat, draggedCenter.lng]
    });
  };

  if (openPaLoading || closedPaLoading) {
    return <Loading />;
  }

  if (openPaError || closedPaError) {
    return (
      <View>
        <Error message={`${openPaError} ${closedPaError}`} />
      </View>
    );
  }

  const center = {
    lat: location.coordinates[0],
    lng: location.coordinates[1]
  };
  const zoom = 15;

  console.log({
    openPaData,
    closedPaData,
    location,
    draggedCenter
  });

  // TODO: Stop this map redrawing when markers update
  return (
    <View>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.googleApiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{
          fullscreenControl: false
        }}
        onChange={({ center }) => setDraggedCenter(center)}
      >
        {closedPaData.pa_status.map(pa => (
          <Marker
            lat={pa.location.coordinates[0]}
            lng={pa.location.coordinates[1]}
            app={pa}
            key={pa.id}
            variant="closed"
          />
        ))}
        {openPaData.pa_status.map(pa => (
          <Marker
            lat={pa.location.coordinates[0]}
            lng={pa.location.coordinates[1]}
            app={pa}
            key={pa.id}
            variant="open"
          />
        ))}
      </GoogleMapReact>
      <RefreshButton doRefresh={handleRefresh} />
    </View>
  );
}
