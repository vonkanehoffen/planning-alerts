import config from "../../config";
import fetch from "node-fetch";
import querystring from "querystring";
import logger from "../logger";

/**
 * Takes a text address and geocode it via google's API
 * @param address
 * @returns {Promise<void>}
 */
export async function geocodeAddress(address) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${querystring.stringify({
      address: address,
      key: config.geocodingAPIKey
    })}`
  );
  const geocode = await response.json();
  logger.info(`geocodeAddress: ${geocode.status}`, { geocode });
  return geocode;
}

/**
 * Batch geocodes a block of results from a scraper.
 * Mutates input with geocode response.
 *
 * Unused: Done directly in storeInGeoFirestore as we don't want to store the full response.
 *
 * @param results
 * @returns {Promise<*>}
 */
export async function geocodeResults(results) {
  if (results.length > config.itemLimit) {
    logger.error(`More than ${config.itemLimit} results to geocode. Aborting.`);
    return;
  }
  for (let i = 0; i < results.length; i++) {
    if (results[i].address) {
      results[i].geocode = await geocodeAddress(results[i].address);
    }
  }
}
