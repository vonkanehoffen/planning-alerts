/**
 * Get distance between two points.
 * https://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 */
export function distance(lat1, lon1, lat2, lon2) {
  var R = 6371e3; // metres
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2 - lat1).toRadians();
  var Δλ = (lon2 - lon1).toRadians();

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
}

/**
 * Round to x decimal places
 * @param value
 * @param decimals
 * @returns {number}
 */
export function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
