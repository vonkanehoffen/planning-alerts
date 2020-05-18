import { subDays, formatISO } from "date-fns";
import { sdk } from "./hasuraSdk";
import admin from "firebase-admin";
import config from "../config";
import { Council } from "../generated/graphql";

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(config.firebaseServiceAccountKey),
  databaseURL: "https://planning-alerts.firebaseio.com"
});

/**
 * Send push notifications to users for new and updated planning apps
 * from a selected council (following scrape finish)
 */
export async function pushNotify(council: Pick<Council, 'id' | 'title'>) {
  console.log("PUSH NOTIFY --------", council.title);

  const limit = 10;
  let offset = 0;
  let users;

  do {
    console.log("GETTING USERS");
    users = await sdk.get_users({
      limit,
      offset
    });
    offset += limit;

    for (let user of users.users) {
      if (user.location && user.fcm_tokens.length > 0) {
        console.log("NOTIFYING USER", user.name);
        const newPAs = await sdk.get_new_planning_apps_near({
          point: user.location,
          distance: 3000, // TODO: User distance selection
          date: formatISO(subDays(new Date(), 3), { representation: "date" }),
          council_id: council.id
        });
        const newPaIds = newPAs.pa_status.map(pa => pa.id);
        console.log("New PA results for", user.name, newPaIds);

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
        console.log("SKIPPING USER", user.name, "No location / FCM token");
      }
    }
  } while (users.users.length > 0);
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
    // @ts-ignore
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.log("Error sending message:", error);
  }
}

// pushNotify("https://pa.manchester.gov.uk/online-applications");
