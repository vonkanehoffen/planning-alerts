const { hasuraRequest } = require("./hasuraRequest");
const { getGeocodedLocation } = require("../idox/geocode");
const queries = require("../queries");

/**
 * Store a planning app in Hasura
 *
 * Add or update pa_status with the most important bits + geocoded location
 * Then store the raw scrape data in pa_scrape, which has a foreign key relationship with pa_status
 *
 * Note theres a function triggered on the table in hasura for created_at and updated_at timestamps
 * See https://x-team.com/blog/automatic-timestamps-with-postgresql/
 * TODO: What about storing errors?
 *
 * @param scrape - pa_scrape_insert_input
 * @returns {Promise<void>}
 */
async function storeScrape(scrape) {
  // Build pa_status_insert_input
  const scrapeUrl = new URL(scrape.url);
  const council = scrapeUrl.hostname;

  let pa_status = {
    address: scrape.summary.address,
    application_validated: scrape.summary.application_validated,
    council,
    decision: scrape.summary.decision,
    decision_issued_date: scrape.summary.decision_issued_date,
    id: scrape.summary.reference, // ID because that's what Apollo Client likes...
    // location: geography
    open: scrape.list_type === "DC_Validated",
    proposal: scrape.summary.proposal,
    status: scrape.summary.status,
    url: scrape.url
  };

  // Find any existing status for this PA
  const existing = await hasuraRequest({
    query: queries.GET_PA_STATUS_EXISTS,
    variables: {
      id: scrape.summary.reference
    }
  });

  if (existing.data.pa_status_by_pk) {
    // We have an existing pa. Let's update status
    await hasuraRequest({
      query: queries.UPDATE_PA_STATUS,
      variables: {
        id: scrape.summary.reference,
        set: pa_status
      }
    });
  } else {
    // This is a new pa. Create status
    pa_status.location = await getGeocodedLocation(scrape.summary.address);

    await hasuraRequest({
      query: queries.INSERT_PA_STATUS,
      variables: {
        objects: [pa_status]
      }
    });
  }

  // Store raw scraoe data
  await hasuraRequest({
    query: queries.INSERT_PA_SCRAPE,
    variables: {
      objects: [scrape]
    }
  });
}

/**
 * Store a log entry
 * @param scraper {string}
 * @param event {string}
 * @param meta {object}
 * @returns {Promise<void>}
 */
async function storeScrapeError(scraper, event, meta) {
  await hasuraRequest({
    query: queries.INSERT_SCRAPE_LOG,
    variables: {
      objects: [
        {
          scraper,
          event,
          meta
        }
      ]
    }
  });
}

exports.storeScrapeError = storeScrapeError;
exports.storeScrape = storeScrape;
