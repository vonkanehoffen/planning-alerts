import React from "react";
import { useQuery } from "@apollo/react-hooks";
import GoogleMapReact from "google-map-react";
import config from "../../config.json";
import Marker from "./Marker";
import { GET_PLANNING_APPS_NEAR_POINT } from "../../gql/queries";
import View from "../../components/View";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

// TODO: drive queries on map movement (mouse up)
export default function PlanningMap({ userLocation }) {
  const [draggedPoint, setDraggedPoint] = React.useState(false);

  const minDate = new Date("2019-06-01"); // TODO: Dynamic date
  const { loading, error, data } = useQuery(GET_PLANNING_APPS_NEAR_POINT, {
    variables: {
      point: draggedPoint || userLocation,
      minDate
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
    lat: userLocation.coordinates[0],
    lng: userLocation.coordinates[1]
  };
  const zoom = 15;

  let googleMap = false;

  console.log("data: ", data, draggedPoint);

  return (
    <View>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.googleApiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => (googleMap = map)}
        options={{
          fullscreenControl: false
        }}
        onChange={({ center }) => {
          console.log("onChange", center);
          // setDraggedPoint({
          //   "type": "Point",
          //   "coordinates": [center.lat, center.lng]
          // });
        }}
      >
        {data.planning_app.map(app => (
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
