import apolloFetch from '../apolloFetch'
import { getGeocodedLocation } from './geocode'
import * as queries from '../queries';

/**
 * Store a validated planning app in Hasura
 * @param record - pa_scrape_validated_insert_input
 * @returns {Promise<void>}
 */
export async function storeValidated (record) {
  const response = await apolloFetch({
    query: queries.INSERT_PA_SCRAPE_VALIDATED,
    variables: {
      objects: [
        record
      ]
    }
  });
  console.log('insert_pa_scrape_validated:', response);
  await storePaStatus(record, VALIDATED);
}

/**
 * Store a decided planning app in Hasura
 * @param record - pa_scrape_decided_insert_input
 * @returns {Promise<void>}
 */
export async function storeDecided (record) {
  const response = await apolloFetch({
    query: queries.INSERT_PA_SCRAPE_DECIDED,
    variables: {
      objects: [
        record
      ]
    }
  });
  console.log('insert_pa_scrape_decided:', response);
  await storePaStatus(record, DECIDED);
}

/**
 * Store the status of a validated or decide planning app.
 *
 * If it already exists, update.
 * If it doesn't, geocode then add
 *
 * Note theres a function triggered on the table in hasura for created_at and updated_at
 * See https://x-team.com/blog/automatic-timestamps-with-postgresql/
 * @param record {object}
 *   - pa_scrape_decided_insert_input \ pa_scrape_validated_insert_input
 * @param open {boolean}
 * @returns {Promise<void>}
 */
async function storePaStatus (record, open) {

  const existing  = await apolloFetch({
    query: queries.GET_PA_STATUS_EXISTS,
    variables: {
      id: record.reference
    }
  });

  const now = new Date().toISOString();

  // are null vals ok tho?
  // pa_status_insert_input

  let pa_status = {
    address: record.address,
    application_validated: record.application_validated,
    decision: record.decision,
    decision_issued_date: record.decision_issued_date,
    id: record.reference,
    // location: geography
    open: open,
    proposal: record.proposal,
    url: record.url,
    updatedAt: now
  }

  if(existing.data.pa_status_by_pk) {
    // We have an existing pa. Let's update status
    const response = await apolloFetch({
      query: queries.UPDATE_PA_STATUS,
      variables: {
        id: record.reference,
        set: record
      }
    })
    return response;
  } else {
    // This is a new pa. Create status
    const location = await getGeocodedLocation(record.address);
    pa_status.location = location;

    const response = await apolloFetch({
      query: queries.INSERT_PA_STATUS,
      variables: {
        objects: [
          pa_status
        ]
      }
    })
    console.log('insert_pa_status', response);
    return response;
  }
}
