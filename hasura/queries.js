import gql from 'graphql-tag';

// TODO: Can we share these across the different packages?

/**
 * Get all locations that haven't been geo-coded successfully
 * @type {DocumentNode}
 */
export const UNGEOCODED_LOCATIONS = gql`
  query no_location {
    planning_app(where: { location: {_is_null: true }}) {
      id
      address
    }
  }
`;
