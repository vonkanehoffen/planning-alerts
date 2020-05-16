import Sentry from "@sentry/node";
import { scrapeWeekly } from "./idox/scrapeWeekly";
import { pushNotify } from "./lib/pushNotify";
import config from "./config"
import { getTargets } from "./getTargets";

// Sentry.init({ dsn: config.sentryDSN, debug: true });

/**
 * Scrape all idox councils...
 * TODO: Run notifier after each scrape
 * @returns {Promise<void>}
 */
async function scrapeAll(): Promise<void> {
  const idoxTargets = await getTargets('idox');
  console.log(idoxTargets);
  // for (let target of idoxTargets) {
  //   await scrapeWeekly(target);
  //   await pushNotify(target);
  // }
}

scrapeAll();

// scrapeWeekly("https://planning.wigan.gov.uk/online-applications");
// scrapeWeekly("https://planning.stockport.gov.uk/PlanningData-live");
// scrapeWeekly("https://planning.cambridgeshire.gov.uk/online-applications/");
// scrapeWeekly("http://planning.cornwall.gov.uk/online-applications");
// scrapeWeekly("https://publicaccess.buckscc.gov.uk/online-applications");
// scrapeWeekly("https://pa.manchester.gov.uk/online-applications");
// scrapeWeekly("https://idoxpa.westminster.gov.uk/online-applications");
