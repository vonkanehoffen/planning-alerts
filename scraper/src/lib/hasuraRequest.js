const { execute, makePromise } = require("apollo-link");
const { HttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");
const config = require("../../config");

const link = new HttpLink({
  uri: config.hasuraApi,
  headers: { 'x-hasura-admin-secret': config.hasuraAdminSecret },
  fetch: fetch
});

/**
 * Make a GraphQL request to our Hasura instance
 * @param operation
 * @returns {Promise<unknown>}
 */
const hasuraRequest = (operation) => makePromise(
  execute(link, operation)
);

exports.hasuraRequest = hasuraRequest;
