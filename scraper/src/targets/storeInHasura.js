import _ from "lodash";
import { createApolloFetch } from 'apollo-fetch');
import logger from "./logger";
import config from "../config";
import { geocodeAddress } from "./geocoding";

/**
 * Store scraped planning apps data in Hasura via GraphQl
 * @param data
 * @returns {Promise<void>}
 */
export default async function storeInHasura(data) {
  if (data.length > config.itemLimit) {
    logger.error(`More than ${config.itemLimit} results to store. Aborting.`);
    return;
  }

  logger.info(`Storing ${data.length} scraped planning applications...`);
  for (let i = 0; i < data.length; i++) {
    let app = data[i];

    const geocode = await geocodeAddress(app.address);
    app.geocodeStatus = geocode.status;
    const location = _.get(geocode, "results[0].geometry.location");

    if (!location) {
      // TODO: Some way to have manual entry for these un-geocodable addresses.
      // stor anyway...
      logger.error(
        `App not geocoded. Unable to store. Address: ${app.address}`,
        { app }
      );
      continue;
    }

    // Hasura upsert here....
  }

}
