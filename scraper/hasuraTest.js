const { apolloFetch } = require('./src/lib/apolloFetch');
const gql = require("graphql-tag");

const query = `
    query get_planning_app_by_id($id: String!) {
    pa_status_by_pk(id: $id) {
      id
      proposal 
    }
  }
`;
// TODO: ....but not when it's gql tagged.

console.log(query);
async function whatever() {
  const resposne = await apolloFetch({
    query,
    variables: {
      "id": "A1234/23"
    }
  });
  console.log(resposne);
}

whatever();
