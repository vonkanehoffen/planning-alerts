# Planning Alerts notes

## Hasura + Auth0

Originally following [this tutorial](https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html) 
and [this example app](https://github.com/hasura/graphql-engine/tree/master/community/sample-apps/todo-auth0-jwt)
which uses `auth0-js`.

However Auth0 now have an updated method [like this](https://auth0.com/docs/quickstart/spa/react) 
based on `@auth0/auth0-spa-js` [https://auth0.com/docs/libraries/auth0-spa-js]

Followed that (with the "New" experience under "Universal Login" on the dashboard)
and [this](https://auth0.com/docs/quickstart/spa/react/02-calling-an-api) follow on about calling an API.

This included making an API in the dash, that wasn't necessary first time round.

The `audience` param was a gotcha [here](https://github.com/auth0/auth0-spa-js/issues/111)
Set from the API made in the dash.

This is needed for full JWTs to be returned.
See also *Rules* in the Auth0 dash to add `x-hasura-user-id` to them etc.

## Apollo

[Getting the Auth0 JWT to the provider](https://github.com/auth0-samples/auth0-javascript-samples/issues/79#issuecomment-551331945)


## TODO

- Change `ref` to `id` in GraphQL - Apollo understands that for auto updates?
- Can I search in a polygon (i.e. map bounds), not a radius? See [here](https://github.com/hasura/graphql-engine/issues/1983) 
  and [here](https://blog.hasura.io/native-support-for-postgis-topology-operators-now-in-graphql-engine/)
