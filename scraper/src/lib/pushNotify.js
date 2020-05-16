const { hasuraRequest } = require("./hasuraRequest");
const { getHostname } = require("./util");
const { subDays, formatISO } = require("date-fns");
const queries = require("../queries");
const admin = require("firebase-admin");
const config = require("../config");

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseServiceAccountKey),
  databaseURL: "https://planning-alerts.firebaseio.com"
});

/**
 * Send push notifications to users for new and updated planning apps
 * from a selected council (following scrape finish)
 * @param rootURL
 * @returns {Promise<void>}
 */
async function pushNotify(rootURL) {
  const council = getHostname(rootURL);
  console.log("PUSH NOTIFY --------", council);

  const limit = 10;
  let offset = 0;
  let users;

  do {
    console.log("GETTING USERS");
    users = await hasuraRequest({
      query: queries.GET_USERS,
      variables: {
        limit,
        offset
      }
    });
    offset += limit;

    for (let user of users.data.users) {
      if (user.location && user.fcm_tokens.length > 0) {
        console.log("NOTIFYING USER", user.name);
        const newPAs = await hasuraRequest({
          query: queries.GET_NEW_PLANNING_APPS_NEAR,
          variables: {
            point: user.location,
            distance: 5000,
            date: formatISO(subDays(new Date(), 3), { representation: "date" }),
            council
          }
        });
        const newPaIds = newPAs.data.pa_status.map(pa => pa.id);
        console.log("NEW PAs FOR", user.name, newPaIds);

        if (newPaIds.length > 0) {
          for (let token of user.fcm_tokens) {
            sendFcm(
              token.token,
              `${newPaIds.length} new planning applications near you this week.`,
              "Click here to see details",
              {
                newPaIds: JSON.stringify(newPaIds)
              }
            );
          }
        }
      } else {
        console.log("SKIPPING USER", user.name, "No new PAs nearby");
      }
    }
  } while (users.data.users.length > 0);

}

async function sendFcm(token, title, body, data) {
  console.log("Sending FCM", { token, title, body, data });
  const message = {
    notification: {
      title,
      body
    },
    data,
    android: {
      priority: "normal"
    },
    apns: {
      headers: {
        "apns-priority": "5"
      }
    },
    webpush: {
      headers: {
        Urgency: "high"
      }
    },
    token
  };
  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.log("Error sending message:", error);
  }
}

// pushNotify("https://pa.manchester.gov.uk/online-applications");
exports.pushNotify = pushNotify;
