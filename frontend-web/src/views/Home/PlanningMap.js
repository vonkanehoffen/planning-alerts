import React from "react";
import _ from "lodash";
import { useQuery } from "@apollo/react-hooks";
import GoogleMapReact from "google-map-react";
import { Grid } from "@material-ui/core";
import config from "../../config.json";
import Marker from "./Marker";
import {
  GET_PLANNING_APPS_NEAR_POINT,
  GET_USER_LOCATION
} from "../../gql/queries";
import { useAuth0 } from "../../react-auth0-spa";
import PlanningList from "./PlanningList";

// TODO: Split to data and display component
//  drive queries on map movement (mouse up)
export default function PlanningMap() {
  const { user } = useAuth0();
  // See https://stackoverflow.com/questions/49317582/how-to-chain-two-graphql-queries-in-sequence-using-apollo-client#answer-49320606
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    GET_USER_LOCATION,
    {
      variables: {
        id: user.sub
      }
    }
  );
  const point = _.get(userData, "users[0].location");
  const { loading, error, data } = useQuery(GET_PLANNING_APPS_NEAR_POINT, {
    variables: {
      point: point
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
    return (
      <div>
        Loading. Please wait...{" "}
        <pre>{JSON.stringify({ loading, userLoading }, null, 2)}</pre>
      </div>
    );
  }

  if (error || userError) {
    return (
      <div>
        <h3>Error:</h3>
        <pre>{JSON.stringify({ error, userError }, null, 2)}</pre>
      </div>
    );
  }

  return (
    <Grid container>
      {/*<Grid item sm={4}>*/}
      {/*  <PlanningList planning_app={data.planning_app} map={googleMap}/>*/}
      {/*</Grid>*/}
      <Grid item sm={12}>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: config.googleApiKey }}
            defaultCenter={center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => (googleMap = map)}
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
        </div>
      </Grid>
    </Grid>
  );
}
