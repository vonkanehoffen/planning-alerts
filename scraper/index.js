const Sentry = require("@sentry/node");
const { scrapeWeekly } = require("./src/idox/scrapeWeekly.js");
const { pushNotify } = require("./src/lib/pushNotify");
const config = require("./config");
const targets = require("targets");

Sentry.init({ dsn: config.sentryDSN, debug: true });

/**
 * Scrape all idox councils...
 * TODO: Run notifier after each scrape
 * @returns {Promise<void>}
 */
async function scrapeAll() {
  for (let rootURL of targets.idox) {
    await scrapeWeekly(rootURL);
    await pushNotify(rootURL);
  }
}

scrapeAll();

// scrapeWeekly("https://planning.wigan.gov.uk/online-applications");
// scrapeWeekly("https://planning.stockport.gov.uk/PlanningData-live");
// scrapeWeekly("https://planning.cambridgeshire.gov.uk/online-applications/");
// scrapeWeekly("http://planning.cornwall.gov.uk/online-applications");
// scrapeWeekly("https://publicaccess.buckscc.gov.uk/online-applications");
// scrapeWeekly("https://pa.manchester.gov.uk/online-applications");
// scrapeWeekly("https://idoxpa.westminster.gov.uk/online-applications");
