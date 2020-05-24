/**
 * This is for Hasura PostGIS operations, ie. geospatial searches
 */
declare type geography = {
  type: "Point"
  coordinates: Array<[number, number]>
}
