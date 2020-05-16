import { execute, makePromise } from "apollo-link";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import nodeFetch from "node-fetch";
import config from "../config";

const httpLink = createHttpLink({
  uri: config.hasuraApi,
  headers: { "x-hasura-admin-secret": config.hasuraAdminSecret },
  fetch: nodeFetch as any
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
export async function hasuraRequest(operation) {
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
