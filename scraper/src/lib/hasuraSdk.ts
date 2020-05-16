import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql"; // THIS FILE IS THE GENERATED FILE
import config from "../config";

const client = new GraphQLClient(config.hasuraApi, {
  headers: { "x-hasura-admin-secret": config.hasuraAdminSecret }
});
export const sdk = getSdk(client);
