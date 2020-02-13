import gql from "graphql-tag";

// Note: This is duplicated in frontend-web/src/gql/queries.js
// Can't symlink though as it breaks code completion in Intellij
// and can't put on repo root as it breaks webpack
// Hmmmm....

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
export const GET_OPEN_PA_NEAR_POINT = gql`
  query get_open_pa_near_point($point: geography!, $distance: Float!) {
    pa_status(
      where: {
        location: { _st_d_within: { distance: $distance, from: $point } }
        open: { _eq: true }
      }
    ) {
      address
      application_validated
      council
      created_at
      decision
      decision_issued_date
      id
      location
      open
      proposal
      status
      updated_at
      url
    }
  }
`;

export const GET_RECENT_CLOSED_PA_NEAR_POINT = gql`
  query get_open_and_recent_pa_near_point(
    $point: geography!
    $distance: Float!
    $minDate: timestamptz!
  ) {
    pa_status(
      where: {
        location: { _st_d_within: { distance: $distance, from: $point } }
        open: { _eq: false }
        updated_at: { _gte: $minDate }
      }
    ) {
      id
      location
      proposal
      address
      application_validated
      decision
      decision_issued_date
    }
  }
`;
