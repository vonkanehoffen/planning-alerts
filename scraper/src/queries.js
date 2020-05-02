const gql = require("graphql-tag");

exports.INSERT_PA_SCRAPE = gql`
  mutation insert_pa_scrape($objects: [pa_scrape_insert_input!]!) {
    insert_pa_scrape(objects: $objects) {
      returning {
        id
        scraped_at
      }
    }
  }
`;

exports.GET_EXISTING_LOCATION = gql`
  query get_existing_location($address: String!) {
    pa_status(where: { address: { _eq: $address } }) {
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
// exports.UPSERT_PA_STATUS = gql`
//   mutation upsert_pa_status($objects: [pa_status_insert_input!]!) {
//     insert_pa_status(
//       objects: $objects
//       on_conflict: { constraint: pa_status_pkey }
//     ) {
//       id
//     }
//   }
// `;

exports.INSERT_PA_STATUS = gql`
  mutation insert_pa_status($objects: [pa_status_insert_input!]!) {
    insert_pa_status(objects: $objects) {
      returning {
        id
        created_at
      }
    }
  }
`;

exports.UPDATE_PA_STATUS = gql`
  mutation update_pa_status($id: String!, $set: pa_status_set_input!) {
    update_pa_status(where: { id: { _eq: $id } }, _set: $set) {
      returning {
        id
        created_at
        updated_at
      }
    }
  }
`;

exports.GET_SCRAPE_TARGETS_BY_TYPE = gql`
  query get_scrape_targets_by_type($scraper: String) {
    council(where: { scraper: { _eq: $scraper}}) {
      id
      portal_url
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
 * Insert a log entry
 * Things like scrape starts and ends, errors....
 * TODO: Table fkey/enum entry event type?
 */
exports.INSERT_SCRAPE_LOG = gql`
  mutation insert_scrape_log($objects: [scrape_log_insert_input!]!) {
    insert_scrape_log(objects: $objects) {
      returning {
        id
        ts
      }
    }
  }
`;

exports.GET_USERS = gql`
  query get_users($limit: Int!, $offset: Int!) {
    users( limit: $limit, offset: $offset) {
      id
      name
      location
      fcm_tokens {
        token
      }
    }
  }
`;

/**
 * Get planning apps
 *  - within a specified distance (km) of a point
 *  - Scraped after a certain time
 *  - From a certain council
 * This is for the push notifications
 *
 * eg.
 * $point: {
          type: "Point",
          coordinates: [ 53.4443108,-2.2754739 ]
        }
 * $distance: 1000
 * $date: "2020-02-06"
 * $council: "pa.manchester.gov.uk"
 */
exports.GET_NEW_PLANNING_APPS_NEAR = gql`
  query get_new_planning_apps_near(
    $point: geography!
    $distance: Float!
    $date: timestamptz!
    $council: String!
  ) {
    pa_status(
      where: {
        location: { _st_d_within: { distance: $distance, from: $point } }
        created_at: { _gte: $date }
        council: { _eq: $council }
      }
    ) {
      id
    }
  }
`;
