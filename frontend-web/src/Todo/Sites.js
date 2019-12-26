import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Todo from "./Todo";

const QUERY_SITES = gql`
  query sites_near_point($point: geography!) {
    site(
      where: { location: { _st_d_within: { distance: 2000, from: $point } } }
    ) {
      id
      location
      name
    }
  }
`;

const queryVars = {
  point: {
    type: "Point",
    coordinates: [12.939553, 77.6183303]
  }
};

export default function Sites() {
  return (
    <Query query={QUERY_SITES} variables={queryVars}>
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
          <div className="parentContainer">
            <h3>Sites query:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
      }}
    </Query>
  );
}
