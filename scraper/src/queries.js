const gql = require("graphql-tag");

exports.INSERT_PA_SCRAPE_VALIDATED = gql`
  mutation insert_pa_scrape_validated($objects: [pa_scrape_validated_insert_input!]!) {
    insert_pa_scrape_validated(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

exports.INSERT_PA_SCRAPE_DECIDED = gql`
  mutation insert_pa_scrape_decided($objects: [pa_scrape_decided_insert_input!]!) {
    insert_pa_scrape_decided(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

exports.GET_EXISTING_LOCATION = gql`
  query get_existing_location($address: String!) {
    pa_status(where: {
      address: { _eq: $address}
    }) {
      id
      location
    }
  }
`;
/**
 * Upsert planning app status
 * Note: leaving out `update_columns` should mean all get updated.
 * See https://github.com/hasura/graphql-engine/issues/342#issuecomment-418602194
 * https://docs.hasura.io/1.0/graphql/manual/mutations/upsert.html
 * @type {DocumentNode}
 */
exports.UPSERT_PA_STATUS = gql`
  mutation upsert_pa_status($objects: [pa_status_insert_input!]!) {
    insert_pa_status(
      objects: $objects,
      on_conflict: {
        constraint: pa_status_pkey
      }) {
      id
    }
  }
`;

exports.INSERT_PA_STATUS = gql`
  mutation insert_pa_status($objects: [pa_status_insert_input!]!) {
    insert_pa_status(objects: $objects) {
      returning {
        id
        created_at
      }
    }
  }
`

exports.UPDATE_PA_STATUS = gql`
  mutation update_pa_status($id: String!, $set: pa_status_set_input!) {
    update_pa_status(
      where: { id: { _eq: $id}},
      _set: $set
    ) {
      returning {
        id
        created_at
        updated_at
      }
    }
  }
`;
/**
 * Check of a status record for a particular app ref exists
 * @type {DocumentNode}
 */
exports.GET_PA_STATUS_EXISTS = gql`
  query get_planning_app_by_id($id: String!) {
    pa_status_by_pk(id: $id) {
      id      
    }
  }
`;

/**
 * Insert planning app
 * @type {DocumentNode}
 */
exports.INSERT_PLANNING_APP = gql`
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
exports.UPDATE_PLANNING_APP = gql`
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
