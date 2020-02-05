const gql = require("graphql-tag");
const { hasuraRequest } = require("./src/lib/hasuraRequest")


const query = gql`
  query get_planning_app_by_id($id: String!) {
    pa_status_by_pk(id: $id) {
      id
      proposal
    }
  }
`;

const variables = {
  id: "A1234/23"
};

// console.log(JSON.stringify(query, null, 2));

async function whatever() {
  // const response = await apolloFetch({
  //   query,
  //   variables
  // });
  const response = await hasuraRequest({
      query,
      variables
    });

  console.log(response);
}

whatever();
