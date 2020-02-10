import gql from 'graphql-tag'

export const TEST_QUERY = gql`
  query cho_ward {
    pa_status(where: {
      pa_scrapes: {
        further_information: {
          _contains: { ward: "Chorlton Ward"}
        }
      }
    }) {
      address
      id
    }
  }
`;
