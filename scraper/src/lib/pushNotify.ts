import { formatISO, subDays } from 'date-fns'
import { sdk } from './hasuraSdk'
import admin from 'firebase-admin'
import config from '../config'
import { Council, User_Pa_Status_Type_Enum } from '../generated/graphql'

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(config.firebaseServiceAccountKey),
  databaseURL: "https://planning-alerts.firebaseio.com"
});

/**
 * Send push notifications to users for new and updated planning apps
 * from a selected council (following scrape finish)
 */
export async function pushNotify(council: Pick<Council, "id" | "title">) {
  console.log("Push Notifying for council:", council.title);

  const limit = 10;
  let offset = 0;
  let users;

  do {
    users = await sdk.get_users({
      limit,
      offset
    });
    offset += limit;

    for (let user of users.users) {
      if (user.location && user.fcm_tokens.length > 0) {
        const newPAs = await sdk.get_new_planning_apps_near({
          point: user.location,
          distance: 3000, // TODO: User distance selection
          date: formatISO(subDays(new Date(), 3), { representation: "date" }),
          council_id: council.id
        });
        const newPaIds = newPAs.pa_status.map(pa => pa.id);
        if (newPaIds.length > 0) {
          for (let token of user.fcm_tokens) {
            await setUserAlerts(newPaIds, user.id);
            await sendFcm(
              token.token,
              `${newPaIds.length} new planning applications near you this week.`,
              "Click here to see details",
              {
                newPaIds: JSON.stringify(newPaIds)
              },
              user.name
            );
          }
        }
      } else {
        console.log(`Skipping user: ${user.name}, No location / FCM token`);
      }
    }
  } while (users.users.length > 0);
}

export async function sendFcm(token, title, body, data, username) {
  const message = {
    notification: {
      title,
      body
    },
    data,
    android: {
      priority: "high"
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
    console.log(
      `FCM sent to user: ${username}, title: ${title}, body: ${body}, data: `,
      data,
      "response:",
      response
    );
  } catch (error) {
    console.log(`Error sending FCM to user: ${username} response:`, error);
  }
}

export async function setUserAlerts(paIds: string[], userId: string) {
  return sdk.set_user_alerts({
    objects: paIds.map(paId => ({
      pa_status_id: paId,
      status: User_Pa_Status_Type_Enum.Alert,
      user_id: userId
    }))
  });
}

// pushNotify("https://pa.manchester.gov.uk/online-applications");
