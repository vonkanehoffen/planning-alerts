import Sentry from "@sentry/node";
import { scrapeWeekly } from "./idox/scrapeWeekly";
import { pushNotify } from "./lib/pushNotify";
import config from "./config"
import { sdk } from "./lib/hasuraSdk";

// Sentry.init({ dsn: config.sentryDSN, debug: true });

/**
 * Scrape all idox councils...
 * TODO: Run notifier after each scrape
 * @returns {Promise<void>}
 */
async function scrapeAll(): Promise<void> {
  const targets = await sdk.get_scrape_targets_by_type({scraper: 'idox'});
  console.log(`Scraping ${targets.council.length} idox councils`);
  for (let council of targets.council) {
    await scrapeWeekly(council);
    await pushNotify(council);

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
