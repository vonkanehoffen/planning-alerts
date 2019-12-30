import gql from "graphql-tag";

/**
 * Get user location
 * vars like:
 * {
  "id": "whatever"
}
 * @type {DocumentNode}
 */
export const GET_USER_LOCATION = gql`
  query get_user_location($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      location
    }
  }
`;

/**
 * Update user location
 *
 * Vars like:
 * {
  "location": {
    "type": "Point",
    "coordinates": [ 12.939553, 77.6183303 ]
  },
  "id": "whatever"
}

 * @type {DocumentNode}
 */
export const UPDATE_USER_LOCATION = gql`
  mutation update_user_location($id: String!, $location: geography!) {
    update_users(where: { id: { _eq: $id } }, _set: { location: $location }) {
      affected_rows
      returning {
        id
        location
      }
    }
  }
`;

/**
 * Get planning apps near a point
 * vars like:
 * {
  "point": {
    "type": "Point",
    "coordinates": [53.5184479,-2.6761717]
  }
}
 * @type {DocumentNode}
 */
export const GET_PLANNING_APPS_NEAR_POINT = gql`
  query get_planning_apps_near_point($point: geography!) {
    planning_app(
      where: { location: { _st_d_within: { distance: 2000, from: $point } } }
    ) {
      ref
      location
      proposal
    }
  }
`;
