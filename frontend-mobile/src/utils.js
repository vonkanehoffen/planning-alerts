/**
 * Convert PostGIS / GraphQL location format to react-native-maps format
 * @param location
 * @returns {{latitude: (*|LatLng), longitude: (*|LatLng)}}
 */
export function postGisToRNMapsLocation(location) {
  return {
    latitude: location.coordinates[0],
    longitude: location.coordinates[1]
  };
}

export function isValidPostcode(postcode) {
  // const postcodeRegEx = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
  // Or...y'know, just get any old one because data doesn't match:
  const postcodeRegEx = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i;
  const result = postcodeRegEx.test(postcode);
  return result;
}
