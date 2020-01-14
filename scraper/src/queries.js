import gql from "graphql-tag";

/**
 * Get all data on a single planning app by ID
 * @type {DocumentNode}
 */
export const GET_PLANNING_APP_BY_ID = gql`
  query get_planning_app_by_id($id: String!) {
    planning_app(
      where: { id: {_eq: $id}}
    ) {
      id
      address
      alternative_ref
      appeal_decision
      appeal_status
      created_at
      decision_date
      decision_status
      geocode_ok
      location
      previousData
      proposal
      updated_at
      url
      validated_date
    }
  }
`;

/**
 * Insert planning app
 * @type {DocumentNode}
 */
export const INSERT_PLANNING_APP = gql`
  mutation insert_planning_app($planning_app: planning_app_insert_input!) {
    insert_planning_app(objects: [$planning_app]) {
      __typename
      affected_rows
      returning {
        id
      }
    }
  }
`;

/**
 * Update planning app
 * @type {DocumentNode}
 */
export const UPDATE_PLANNING_APP = gql`
  mutation update_planning_app($id: String!, $changes: planning_app_set_input!) {
    update_planning_app(
      where: { id: {_eq: $id }},
      _set: $changes
    ) {
      __typename
      affected_rows
      returning {
        id
      }
    }
  }
`;
