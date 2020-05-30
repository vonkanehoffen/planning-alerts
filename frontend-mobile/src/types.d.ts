/**
 * Coordinate set from device location lookup etc.
 */
declare type coordinates = Array<number,number>;

/**
 * This is for Hasura PostGIS operations, ie. geospatial searches
 */
declare type geography = {
  type: "Point"
  coordinates: coordinates
}
