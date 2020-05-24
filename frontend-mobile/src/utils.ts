/**
 * Convert PostGIS / GraphQL location format to react-native-maps format
 * @param location
 * @returns {{latitude: (*|LatLng), longitude: (*|LatLng)}}
 */
// @ts-ignore
export function postGisToRNMapsLocation(location) {
  return {
    latitude: location.coordinates[0],
    longitude: location.coordinates[1]
  };
}

/**
 * Get map region.
 * From: https://github.com/react-native-community/react-native-maps/issues/505#issuecomment-301308736
 * Distance is kinda metres? On phone screen 5000 = 6.4 x 3km
 * @param lat
 * @param lon
 * @param distance
 * @returns {{longitudeDelta: number, latitudeDelta: number, latitude: *, longitude: *}}
 */
// @ts-ignore
export function regionFrom(lat, lon, distance) {
  distance = distance / 2;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = distance / circumference;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)
    )
  );

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta,
    longitudeDelta
  };
}

/**
 * Checks validity of a postcode
 * @param postcode
 * @returns {boolean}
 */
// @ts-ignore
export function isValidPostcode(postcode) {
  // const postcodeRegEx = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
  const postcodeRegEx = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i;
  const result = postcodeRegEx.test(postcode);
  return result;
}
