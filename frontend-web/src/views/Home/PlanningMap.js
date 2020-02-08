import React from "react";
import { useQuery } from "@apollo/react-hooks";
import GoogleMapReact from "google-map-react";
import config from "../../config.json";
import Marker from "./Marker";
import { GET_OPEN_PA_NEAR_POINT } from "../../gql/queries";
import View from "../../components/View";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { round } from "../../utils/math";
import RefreshButton from '../../components/RefreshButton'

// TODO: drive queries on map movement (mouse up)
export default function PlanningMap({ userLocation }) {
  const [ draggedCenter, setDraggedCenter] = React.useState(false);
  const [ location, setLocation ] = React.useState(userLocation)
  const minDate = new Date("2019-06-01"); // TODO: Dynamic date

  const { loading, error, data } = useQuery(GET_OPEN_PA_NEAR_POINT, {
    variables: {
      point: location,
      distance: 2000
    }
    // skip: !userLocation
  });

  const handleRefresh = () => {
    console.log('referesh');
    setLocation({
      type: "Point",
      coordinates: [draggedCenter.lat, draggedCenter.lng]
    });
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View>
        <Error message={error} />
      </View>
    );
  }

  const center = {
    lat: location.coordinates[0],
    lng: location.coordinates[1]
  };
  const zoom = 15;

  console.log({
    data,
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
        {data.pa_status.map(app => (
          <Marker
            lat={app.location.coordinates[0]}
            lng={app.location.coordinates[1]}
            app={app}
            key={app.id}
          />
        ))}
      </GoogleMapReact>
      <RefreshButton doRefresh={handleRefresh}/>
    </View>
  );
}
