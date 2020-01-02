module.exports = {
  geocodingAPIKey: "GOOGLE_MAPS_API_KEY_HERE",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
  slackWebHookURL:
    "https://hooks.slack.com/services/abc12345/6789defg/hijklmno12345",
  sentryDSN: "https://abc123@sentry.io/123456",
  itemLimit: 2000,
  serviceAccountKey: {
    type: "service_account",
    project_id: "my-planning-alerts",
    private_key_id: "KEY_ID_HERE",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n",
    client_email: "badgerweb2@my-planning-alerts.iam.gserviceaccount.com",
    client_id: "CLIENT_ID_HERE",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/badgerweb2%40my-planning-alerts.iam.gserviceaccount.com"
  }
};
