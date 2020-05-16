const admin = require('firebase-admin');
const config = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseServiceAccountKey),
  databaseURL: "https://planning-alerts.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.

// Android dev
// var registrationToken = 'flEefYd-9ac:APA91bH6SdbvMrwHl-xnyr3VEgbv2YlCFGo53QuE1xvC48oXFQJuJg24k8n-b-eEfITfi7qjmxzxxLCqT0IKJFqk8APZNybVF2bzX4h5WDM_vNH5958luCc4Ny2O5N5oedFX-XM9IENV';

// iOS dev
var registrationToken = "eKqpAtfwXtM:APA91bGT6gz4WnbIO3ZNd3CWJI6c7B7NB2duIgO-r0wWt6SOM-aK6NOABxTovM_CuNp3qauz1YLWxFzbVHbG8JNDnYsBUbNBOxN-4JZ7KyFPS5zS1Q-1nEHY9I8DECJWG-th7E_WvZcp";

var message = {
  "notification":{
    "body" : "Planning Alerts thing body",
    "title" : "PA Thing test test",
  },
  "data" : {
    "volume" : "3.21.15",
    "contents" : "12345ABCDE"
  },
  "android":{
    "priority":"normal"
  },
  "apns":{
    "headers":{
      "apns-priority":"5"
    }
  },
  "webpush": {
    "headers": {
      "Urgency": "high"
    }
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    process.exit();
  })
  .catch((error) => {
    console.log('Error sending message:', error);
    process.exit();
  });

