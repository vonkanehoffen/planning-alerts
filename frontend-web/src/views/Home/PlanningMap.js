import React from "react";
import _ from "lodash";
import { useQuery } from "@apollo/react-hooks";
import GoogleMapReact from "google-map-react";
import { navigate } from "@reach/router";
import config from "../../config.json";
import Marker from "./Marker";
import {
  GET_PLANNING_APPS_NEAR_POINT,
  GET_USER_LOCATION
} from "../../gql/queries";
import { useAuth0 } from "../../react-auth0-spa";
import View from "../../components/View";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

// TODO: Split to data and display component
//  drive queries on map movement (mouse up)
export default function PlanningMap() {
  const { user } = useAuth0();
  const [draggedPoint, setDraggedPoint] = React.useState(false);
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    GET_USER_LOCATION,
    {
      variables: {
        id: user.sub
      }
    }
  );
  const point = _.get(userData, "users[0].location");
  const minDate = new Date("2019-06-01"); // TODO: Dynamic date
  const { loading, error, data } = useQuery(GET_PLANNING_APPS_NEAR_POINT, {
    variables: {
      point: draggedPoint || point,
      minDate
    },
    skip: !point
  });

  const center = {
    lat: point && point.coordinates[0],
    lng: point && point.coordinates[1]
  };
  const zoom = 14;

  let googleMap = false;

  if (loading || userLoading) {
    return <Loading />;
  }

  if (error || userError) {
    return (
      <View>
        <Error
          message={<pre>{JSON.stringify({ error, userError }, null, 2)}</pre>}
        />
      </View>
    );
  }

  if (!point) {
    navigate("set-location");
    return false;
  }

  console.log("data: ", data, draggedPoint);
  // TODO: Move map to class to stop redraw.
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
        onChange={center => {
          console.log("onBoundsChange", center);
          // setDraggedPoint({
          //   "type": "Point",
          //   "coordinates": center
          // });
        }}
      >
        {data &&
          data.planning_app.map(app => (
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
