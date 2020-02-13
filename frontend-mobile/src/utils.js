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
