const { execute, makePromise } = require("apollo-link");
const { ApolloLink } = require("apollo-link");
const { createHttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
const config = require("../../config");

const httpLink = createHttpLink({
  uri: config.hasuraApi,
  headers: { "x-hasura-admin-secret": config.hasuraAdminSecret },
  fetch: fetch
});

const middlewareLink = new ApolloLink((operation, forward) => {
  if (config.debug)
    console.log(`
HASURA REQUEST--------
query:
${operation.query.loc.source.body}

variables:
${JSON.stringify(operation.variables, null, 2)}
`);
  return forward(operation);
});

const link = middlewareLink.concat(httpLink);

/**
 * Make a GraphQL request to our Hasura instance
 * @param operation
 * @returns {Promise<unknown>}
 */
async function hasuraRequest(operation) {
  const response = await makePromise(execute(link, operation));
  if (response.errors)
    throw `hasuraRequest error: ${JSON.stringify(response.errors, null, 2)}`;
  if (config.debug)
    console.log(`
HASURA RESPONSE--------
${JSON.stringify(response, null, 2)}
`);
  return response;
}

exports.hasuraRequest = hasuraRequest;
