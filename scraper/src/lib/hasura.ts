import { sdk } from "./hasuraSdk";
import { getGeocodedLocation } from "../idox/geocode";
import { stringToISODate } from "./util";
import { Pa_Status_Insert_Input } from '../generated/graphql'
import { Scrape } from '../idox/scrapeWeekly'

/**
 * Store a planning app in Hasura
 *
 * Add or update pa_status with the most important bits + geocoded location
 * Then store the raw scrape data in pa_scrape, which has a foreign key relationship with pa_status
 *
 * Note theres a function triggered on the table in hasura for created_at and updated_at timestamps
 * See https://x-team.com/blog/automatic-timestamps-with-postgresql/
 * TODO: What about storing errors?
 */
export async function storeScrape(scrape: Scrape, council_id: number) {
  // Build pa_status_insert_input
  let pa_status: Pa_Status_Insert_Input = {
    address: scrape.summary.address,
    application_validated: stringToISODate(
      scrape.summary.application_validated
    ),
    council_id, // todo: this needs updating elsewhere too?
    decision: scrape.summary.decision,
    decision_issued_date: stringToISODate(scrape.summary.decision_issued_date),
    id: scrape.summary.reference, // ID because that's what Apollo Client likes...
    // location: geography
    open: scrape.list_type === "DC_Validated",
    proposal: scrape.summary.proposal,
    status: scrape.summary.status,
    url: scrape.url
  };

  // Find any existing status for this PA
  const existing = await sdk.get_pa_status_exists({
      id: scrape.summary.reference
  });

  if (existing.pa_status_by_pk) {
    // We have an existing pa. Let's update status
    await sdk.update_pa_status({
        id: scrape.summary.reference,
        set: pa_status
      });
  } else {
    // This is a new pa. Create status
    pa_status.location = await getGeocodedLocation(scrape.summary.address);

    await sdk.insert_pa_status({
        objects: [pa_status]
      });
  }

  // Store raw scraoe data
  await sdk.insert_pa_scrape({
      objects: [scrape]
  });
}

/**
 * Store a log entry
 * TODO: Also post to Slack with config.slackWebHookURL
 */
export async function storeScrapeLog(scraper, council_id, event, meta) {
  await sdk.insert_scrape_log({
    objects: [
      {
        scraper,
        council_id,
        event,
        meta
      }
    ]
  });
}
