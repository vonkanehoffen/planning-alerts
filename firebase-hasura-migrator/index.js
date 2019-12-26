const { createApolloFetch } = require('apollo-fetch');
const firebaseAdmin = require("firebase-admin");

const config = require('./config');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.serviceAccountKey)
});
const firestore = firebaseAdmin.firestore();

// const link = new HttpLink({
//   uri: config.hasuraApi,
//   headers: {
//     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFUQkdPVE00TkRaRU4wRTRPRE0zTlRNMU5UQkJSalkyTUVWQlFURTFSREpFTlRJeU1UUXpSUSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTA2MzM4MTU0NjU1Mzk2NDExMjMzIn0sImh0dHA6Ly9teW5hbWVzcGFjZS9oZWxsbyI6IndvcmxkIiwiZ2l2ZW5fbmFtZSI6IkJhcm9uIiwiZmFtaWx5X25hbWUiOiJWb25LYW5lSG9mZmVuIiwibmlja25hbWUiOiJiYXJvbi52b25rYW5laG9mZmVuIiwibmFtZSI6IkJhcm9uIFZvbkthbmVIb2ZmZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FBdUU3bUFSU0EtTzVBRzgteGtiMlZrV0hKR2JUcUloMlZxVi1BTTlsYXpfdWciLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDE5LTEyLTIyVDIyOjA1OjQ1LjM5MVoiLCJlbWFpbCI6ImJhcm9uLnZvbmthbmVob2ZmZW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8va2FuZWMuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA2MzM4MTU0NjU1Mzk2NDExMjMzIiwiYXVkIjoiV3pYWWFMQTQ4WmxKUEd0ckNNSGZXbXc5eXRvcHdJOUUiLCJpYXQiOjE1NzcwNTIzNDcsImV4cCI6MTU3NzA4ODM0Nywibm9uY2UiOiJ6eDU0Z2owM2dKZ2xCbEhnfktfdkgyVkFvT1RTY2tqQ3JkckI4a0Nqan5xIn0.h56wQ0u_o-76OVKUZg1_KqhAqpuI-TD21esQC4XLslRFu_t1Vbx1ONBsWVmouSOTpjzsqE-odKAvuduMKl91IFD_g3JkmZ-SHrRFEWOKtHWxNzE7xV_d_ElBCsz3sm8-Jl9PrdSWv_wrrH2PEaQPs2LkU6Zw5VHxboazcFdj0NBDU10q7n-IIWGv707Fl8zN9XwkjmRqWMlz_f5eVYgAlzw02RN1GxBZCo2n3GXBK_T3EIkwqUhAtySyETrNLNJWw7gly3lVasSRZcuo5EOB5-mfgZPg4B9WJZf7IBpXNilyjsmu1RA3hl24Yh2DJOxWDlzGFmqn2PavOGEurCdODA'
//   },
//   fetch
// });
const apolloFetch = createApolloFetch({ uri: config.hasuraApi });

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {};  // Create the headers object if needed.
  }
  // options.headers['authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFUQkdPVE00TkRaRU4wRTRPRE0zTlRNMU5UQkJSalkyTUVWQlFURTFSREpFTlRJeU1UUXpSUSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTA2MzM4MTU0NjU1Mzk2NDExMjMzIn0sImh0dHA6Ly9teW5hbWVzcGFjZS9oZWxsbyI6IndvcmxkIiwiZ2l2ZW5fbmFtZSI6IkJhcm9uIiwiZmFtaWx5X25hbWUiOiJWb25LYW5lSG9mZmVuIiwibmlja25hbWUiOiJiYXJvbi52b25rYW5laG9mZmVuIiwibmFtZSI6IkJhcm9uIFZvbkthbmVIb2ZmZW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FBdUU3bUFSU0EtTzVBRzgteGtiMlZrV0hKR2JUcUloMlZxVi1BTTlsYXpfdWciLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDE5LTEyLTIyVDIyOjA1OjQ1LjM5MVoiLCJlbWFpbCI6ImJhcm9uLnZvbmthbmVob2ZmZW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8va2FuZWMuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA2MzM4MTU0NjU1Mzk2NDExMjMzIiwiYXVkIjoiV3pYWWFMQTQ4WmxKUEd0ckNNSGZXbXc5eXRvcHdJOUUiLCJpYXQiOjE1NzcwNTIzNDcsImV4cCI6MTU3NzA4ODM0Nywibm9uY2UiOiJ6eDU0Z2owM2dKZ2xCbEhnfktfdkgyVkFvT1RTY2tqQ3JkckI4a0Nqan5xIn0.h56wQ0u_o-76OVKUZg1_KqhAqpuI-TD21esQC4XLslRFu_t1Vbx1ONBsWVmouSOTpjzsqE-odKAvuduMKl91IFD_g3JkmZ-SHrRFEWOKtHWxNzE7xV_d_ElBCsz3sm8-Jl9PrdSWv_wrrH2PEaQPs2LkU6Zw5VHxboazcFdj0NBDU10q7n-IIWGv707Fl8zN9XwkjmRqWMlz_f5eVYgAlzw02RN1GxBZCo2n3GXBK_T3EIkwqUhAtySyETrNLNJWw7gly3lVasSRZcuo5EOB5-mfgZPg4B9WJZf7IBpXNilyjsmu1RA3hl24Yh2DJOxWDlzGFmqn2PavOGEurCdODA'
  options.headers['x-hasura-admin-secret'] = config.hasuraAdminSecret;
  next();
});

function toISODate(n) {
  const d = new Date(n*1000);
  return d.toISOString();
}
async function migrate() {

  console.log('Getting firestore records...');

  const appsRef = firestore.collection('planningLocations');
  const query = appsRef.orderBy('d.createdAt', 'desc').limit(30);
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

      const obj = {
        ref: app.reference,
        alternative_ref: app.alternativeReference,
        proposal: app.proposal,
        url: app.url,
        address: app.address,
        location,
        geocode_ok: app.geocodeStatus === 'OK',
        validated_date: app.applicationValidated,
        decision_date: app.decisionIssuedDate,
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

migrate();

