const admin = require('firebase-admin');
const config = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseServiceAccountKey),
  databaseURL: "https://planning-alerts.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.
var registrationToken = 'TOKEN HERE';

var message = {
  data: {
    score: 'whatever',
    time: '2:45'
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

