import React from 'react'
import { Query } from "react-apollo";
import GoogleMapReact from 'google-map-react';
import { QUERY_PLANNING_APPS_NEAR_POINT } from './queries'
import { GOOGLE_API_KEY } from '../config'
import Marker from './Marker'

// TODO: This should come from user data
const queryVars = {
  "point": {
    "type": "Point",
    "coordinates": [53.5184479,-2.6761717]
  }
};

export default function PlanningMap () {

  const center = {
    lat: queryVars.point.coordinates[0],
    lng: queryVars.point.coordinates[1]
  };
  const zoom = 11;

  return (
    <Query query={QUERY_PLANNING_APPS_NEAR_POINT} variables={queryVars}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading. Please wait...</div>;
        }
        if (error) {
          return (
            <div>
              <h3>Error:</h3>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          );
        }
        return (
          <div>
            <h3>Planning Apps query:</h3>
            <div style={{ height: '100vh', width: '100%' }}>
              <GoogleMapReact bootstrapURLKeys={{ key: GOOGLE_API_KEY}} defaultCenter={center} defaultZoom={zoom}>
                {data.planning_app.map(app => (
                  <Marker
                    lat={app.location.coordinates[0]}
                    lng={app.location.coordinates[1]}
                    text={app.ref}
                    key={app.ref}
                  />))}
              </GoogleMapReact>
            </div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
      }}
    </Query>
  )
};
