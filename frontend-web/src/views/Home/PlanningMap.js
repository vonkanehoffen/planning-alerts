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

// TODO: drive queries on map movement (mouse up)
export default function PlanningMap({ userLocation }) {
  const [draggedPoint, setDraggedPoint] = React.useState(false);

  const location = draggedPoint || userLocation;
  const minDate = new Date("2019-06-01"); // TODO: Dynamic date

  const { loading, error, data } = useQuery(GET_OPEN_PA_NEAR_POINT, {
    variables: {
      point: location,
      distance: 2000
    }
    // skip: !userLocation
  });

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

  console.log("data: ", data, draggedPoint);

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
        onChange={({ center: newCenter }) => {
          if (
            center.lat !== round(newCenter.lat, 7) &&
            center.lng !== round(newCenter.lng, 7)
          ) {
            setDraggedPoint({
              type: "Point",
              coordinates: [newCenter.lat, newCenter.lng]
            });
          }
        }}
      >
        {data.pa_status.map(app => (
          <Marker
            lat={app.location.coordinates[0]}
            lng={app.location.coordinates[1]}
            app={app}
            key={app.ref}
          />
        ))}
      </GoogleMapReact>
    </View>
  );
}
