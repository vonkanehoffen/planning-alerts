import React from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { QUERY_PLANNING_APPS_NEAR_POINT } from './queries'

// TODO: This should come from user data
const queryVars = {
  "point": {
    "type": "Point",
    "coordinates": [53.5184479,-2.6761717]
  }
};

export default function PlanningMap () {
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
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
      }}
    </Query>
  )
};
