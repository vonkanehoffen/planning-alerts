const { execute, makePromise } = require("apollo-link");
const { HttpLink } = require("apollo-link-http");
const config = require("./config");
const gql = require("graphql-tag");
const fetch = require("node-fetch");

const link = new HttpLink({
  uri: config.hasuraApi,
  headers: { 'x-hasura-admin-secret': config.hasuraAdminSecret },
  fetch: fetch
});

// const { apolloFetch } = require('./src/lib/apolloFetch');

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
  const response = await makePromise(
    execute(link, {
      query,
      variables
    })
  );

  console.log(response);
}

whatever();
