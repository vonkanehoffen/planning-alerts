const { createApolloFetch } = require('apollo-fetch');
const firebaseAdmin = require("firebase-admin");

const config = require('./config');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.serviceAccountKey)
});
const firestore = firebaseAdmin.firestore();

const apolloFetch = createApolloFetch({ uri: config.hasuraApi });

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {};  // Create the headers object if needed.
  }
  options.headers['x-hasura-admin-secret'] = config.hasuraAdminSecret;
  next();
});

function toISODate(n) {
  const d = new Date(n*1000);
  return d.toISOString();
}

function stringToISODate(s) {
  console.log('stringToISODate: ', s);
  if(s) {
    try {
      const d = new Date(s);
      return d.toISOString();
    } catch(e) {
      return false;
    }
  } else {
    return false;
  }
}

async function migrate() {

  console.log('Getting firestore records...');

  const appsRef = firestore.collection('planningLocations');

  const limit = 30;
  for(let offset = 0; offset < 4000; offset += limit) {
    console.log("OFFSET = ", offset);
    const query = appsRef.orderBy('d.createdAt', 'desc').limit(limit).offset(offset);
    const snapshot = await query.get();

    const data = [];
    snapshot.forEach(doc => data.push(doc.data()));

    for(const doc of data) {

      const location = {
        type: 'Point',
        coordinates: [
          doc.d.coordinates._latitude,
          doc.d.coordinates._longitude
        ]
      };
      const created_at = toISODate(doc.d.createdAt.seconds);
      const updated_at = doc.d.updatedAt && toISODate(doc.d.updatedAt.seconds);

      for(const app of doc.d.apps) {

        const validated_date = stringToISODate(app.applicationValidated);
        const decision_date = stringToISODate(app.decisionIssuedDate);
        const obj = {
          ref: app.reference,
          alternative_ref: app.alternativeReference,
          proposal: app.proposal,
          url: app.url,
          address: app.address,
          location,
          geocode_ok: app.geocodeStatus === 'OK',
          ...(validated_date && { validated_date }),
          ...(decision_date && { decision_date }),
          decision_status: app.decision,
          appeal_status: app.appealStatus,
          appeal_decision: app.appealDecision,
          created_at,
          ...(updated_at && { updated_at })
        };
        console.log('OBJECT:', obj);

        const response = await apolloFetch({
          query: `mutation insert_planning_app($objects: [planning_app_insert_input!]!) {
          insert_planning_app(objects: $objects) {
            returning {
              ref
              address
              created_at
            }
          }
        }`,
          variables: {
            objects: [
              obj
            ]
          }
        });

        console.log('APOLLO: ', response);
      }
    };

  }
}

migrate();

