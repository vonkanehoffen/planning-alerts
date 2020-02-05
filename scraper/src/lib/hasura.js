const { hasuraRequest } = require("./hasuraRequest");
const { getGeocodedLocation } = require("../idox/geocode");
const queries = require("../queries");

/**
 * Store a validated planning app in Hasura
 * @param record - pa_scrape_validated_insert_input
 * @returns {Promise<void>}
 */
async function storeValidated(record) {
  const response = await hasuraRequest({
    query: queries.INSERT_PA_SCRAPE_VALIDATED,
    variables: {
      objects: [record]
    }
  });
  // TODO: What about storing errors?
  console.log("insert_pa_scrape_validated:", response);
  await storePaStatus(record, true);
}

/**
 * Store a decided planning app in Hasura
 * @param record - pa_scrape_decided_insert_input
 * @returns {Promise<void>}
 */
async function storeDecided(record) {
  const response = await hasuraRequest({
    query: queries.INSERT_PA_SCRAPE_DECIDED,
    variables: {
      objects: [record]
    }
  });
  console.log("insert_pa_scrape_decided:", response);
  await storePaStatus(record, false);
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
async function storePaStatus(record, open) {
  console.log("REF: ", record.summaryPage.reference);
  const existing = await hasuraRequest({
    query: queries.GET_PA_STATUS_EXISTS,
    variables: {
      id: record.summaryPage.reference
    }
  });

  console.log("EXISTING: ", existing);

  // are null vals ok tho?
  // pa_status_insert_input

  let pa_status = {
    address: record.summaryPage.address,
    application_validated: record.summaryPage.application_validated,
    decision: record.summaryPage.decision,
    decision_issued_date: record.summaryPage.decision_issued_date,
    id: record.summaryPage.reference,
    // location: geography
    open: open,
    proposal: record.summaryPage.proposal,
    url: record.summaryPage.url
  };

  if (existing.data.pa_status_by_pk) {
    // We have an existing pa. Let's update status
    const response = await hasuraRequest({
      query: queries.UPDATE_PA_STATUS,
      variables: {
        id: record.summaryPage.reference,
        set: record
      }
    });
    console.log("update_pa_status", response);
    return response;
  } else {
    // This is a new pa. Create status
    const location = await getGeocodedLocation(record.summaryPage.address);
    pa_status.location = location;

    const response = await hasuraRequest({
      query: queries.INSERT_PA_STATUS,
      variables: {
        objects: [pa_status]
      }
    });
    console.log("insert_pa_status", response);
    return response;
  }
}

exports.storeValidated = storeValidated;
exports.storeDecided = storeDecided;
