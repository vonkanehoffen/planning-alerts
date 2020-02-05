import { createApolloFetch } from 'apollo-fetch'
import config from '../../config'

const apolloFetch = createApolloFetch({ uri: config.hasuraApi });

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {};  // Create the headers object if needed.
  }
  options.headers['x-hasura-admin-secret'] = config.hasuraAdminSecret;
  console.log('apolloFetch request: ', request);
  next();
});

export default apolloFetch;
