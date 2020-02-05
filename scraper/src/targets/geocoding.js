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
