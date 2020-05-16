import { sdk } from "../lib/hasuraSdk";
import config from "../config";
import nodeFetch from "node-fetch";
import querystring from "querystring";

/**
 * Get geocoded location
 * either from existing pa_status record with matching address
 * or via the Google Geocoding API if none exists
 * @param address
 * @returns {Promise<{}|boolean>}
 */
export async function getGeocodedLocation(address) {
  const existingQuery = await sdk.get_existing_location({
    address: address
  });

  const match = existingQuery.pa_status[0];
  if (match) {
    console.log("getGeocodedLocation from existing pa_status, id:", match.id);
    return match.location;
  }

  const geocode = await geocodeAddress(address);
  if (geocode.results.length > 0)
    return {
      type: "Point",
      coordinates: [
        geocode.results[0].geometry.location.lat,
        geocode.results[0].geometry.location.lng
      ]
    };

  return undefined;
}

/**
 * Takes a text address and geocode it via google's API
 * @param address
 * @returns {Promise<void>}
 */
async function geocodeAddress(address) {
  const response = await nodeFetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${querystring.stringify({
      address: address,
      key: config.geocodingAPIKey
    })}`
  );
  const geocode = await response.json();
  console.log("geocodeAddress: ", address, geocode);
  return geocode;
}

let result_eg = {
  results: [
    {
      address_components: [
        {
          long_name: "101",
          short_name: "101",
          types: ["street_number"]
        },
        {
          long_name: "Dudley Road",
          short_name: "Dudley Rd",
          types: ["route"]
        },
        {
          long_name: "Manchester",
          short_name: "Manchester",
          types: ["postal_town"]
        },
        {
          long_name: "Greater Manchester",
          short_name: "Greater Manchester",
          types: ["administrative_area_level_2", "political"]
        },
        {
          long_name: "England",
          short_name: "England",
          types: ["administrative_area_level_1", "political"]
        },
        {
          long_name: "United Kingdom",
          short_name: "GB",
          types: ["country", "political"]
        },
        {
          long_name: "M16",
          short_name: "M16",
          types: ["postal_code", "postal_code_prefix"]
        }
      ],
      formatted_address: "101 Dudley Rd, Manchester M16, UK",
      geometry: {
        location: {
          lat: 53.4507316,
          lng: -2.2630649
        },
        location_type: "RANGE_INTERPOLATED",
        viewport: {
          northeast: {
            lat: 53.4520805802915,
            lng: -2.261715919708498
          },
          southwest: {
            lat: 53.4493826197085,
            lng: -2.264413880291502
          }
        }
      },
      place_id:
        "Eh0xMDEgRHVkbGV5IFJkLCBNYW5jaGVzdGVyLCBVSyIaEhgKFAoSCZEnx1j_rXtIESSEj8Kd8PrKEGU",
      types: ["street_address"]
    }
  ],
  status: "OK"
};
