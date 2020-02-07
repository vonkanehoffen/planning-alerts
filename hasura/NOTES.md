## Heroku Hasura instance:

https://planning-alerts.herokuapp.com/console/api-explorer
https://planning-alerts.herokuapp.com/v1/graphql

## Function geo search:

Taken from https://blog.hasura.io/graphql-and-geo-location-on-postgres-using-hasura-562e7bd47a2f/

```graphql
{
  search_sites_near_user(args: {userid: 4, distance_kms: 20}) {
    user_id
    location
    nearby_sites
  }
}
```

This is the func:
```sql
CREATE
OR REPLACE FUNCTION public.search_sites_near_user(userid integer, distance_kms integer) RETURNS SETOF user_sites LANGUAGE sql STABLE AS $ function $
SELECT
  A.user_id,
  A.location,
  (
    SELECT
      json_agg(row_to_json(B))
    FROM
      site B
    WHERE
      (
        ST_Distance(
          ST_Transform(B.location :: Geometry, 3857),
          ST_Transform(A.location :: Geometry, 3857)
        ) / 1000
      ) < distance_kms
  ) AS nearby_sites
FROM
  user_location A
where
  A.user_id = userid $ function $
```

## Native PostGIS query:

Hasura can now do it natively:
https://blog.hasura.io/native-support-for-postgis-topology-operators-now-in-graphql-engine/

...so no need for fn.

See https://docs.hasura.io/1.0/graphql/manual/queries/query-filters.html#postgis-spatial-relationship-operators-st-contains-st-crosses-etc

```graphql
query sites_near_point($point: geography!){
  site(
    where: {location: {_st_d_within: {distance: 2000, from: $point}}}
  ){
    id
    location
    name
  }
}
```
```json
{
  "point": {
    "type": "Point",
    "coordinates": [ 12.939553, 77.6183303 ]
  }
}
```

## Compound queries

...with jsonb:

```graphql
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
    pa_scrapes {
      further_information
    }
  }
}
```

.. geo + text filter

```graphql
query tree_works_near_point {
  pa_status(where: {
    location: {
      _st_d_within: {
        distance: 1000, 
        from: {
          type: "Point",
          coordinates: [ 53.4443108,-2.2754739 ]
        }
      }
    },
    proposal: {
      _ilike: "%tree%"
    }
  }) {
    id
    proposal
    address
    updated_at
    url
    pa_scrapes {
      further_information
    }
  }
}
```

## Heroku deploy:

Normal template here:
https://github.com/hasura/graphql-engine-heroku

I set up with PostGIS extended one:
https://github.com/hasura/graphql-engine/tree/master/install-manifests/docker-compose-postgis

We should secure the endpoint with JWT:
https://docs.hasura.io/1.0/graphql/manual/auth/authentication/jwt.html

Maybe Auth0? Gets us FB & Google login out the box?
https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html


## Auth0

My app domain name:
kanec.eu.auth0.com

Login URL:
https://kanec.eu.auth0.com/login?client=WzXYaLA48ZlJPGtrCMHfWmw9ytopwI9E&protocol=oauth2&response_type=token%20id_token&redirect_uri=http://localhost:3000/&scope=openid%20profile

(Doesn't work)

Need to add hasura specific claims like:
https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html

```js
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  context.idToken[namespace] =
    {
      'x-hasura-default-role': 'user',
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.user_id
    };
  console.log('hasura idToken rule:', context);
  callback(null, user, context);
}
```

See
https://auth0.com/docs/rules/references/samples

Test with:
https://jwt.io/

Realtime logs: https://kanec.eu8.webtask.io/a9446dcf57413cd0ec81c8a5456518f9


Should be an access_token not ID token according to Auth0.

https://community.auth0.com/t/how-to-obtain-id-token-with-auth0-spa-js/27574/13
https://github.com/hasura/graphql-engine/tree/master/community/sample-apps/todo-auth0-jwt


Working!
examples/todo-auth0-jwt/todo-app/src/Todo/Sites.js

DB schema


uuid primary key
