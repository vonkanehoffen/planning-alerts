import scrapeIdox from "./targets/idox/";
import storeInGeoFirestore from "./targets/storeInGeoFirestore";
import logger from "./logger";
import config from "../config";

// TODO: Old version! See root index.js


const Sentry = require("@sentry/node");
Sentry.init({ dsn: config.sentryDSN, debug: true });

async function doScrape() {
  try {
    // Think all these use "idox": http://www.idoxgroup.com/
    const idoxSites = [
      // Greater manchester councils
      // https://en.wikipedia.org/wiki/Greater_Manchester
      "https://pa.manchester.gov.uk/online-applications",
      "https://publicaccess.trafford.gov.uk/online-applications",
      "https://www.planningpa.bolton.gov.uk/online-applications-17",
      "https://planning.bury.gov.uk/online-applications",
      "http://planningpa.oldham.gov.uk/online-applications",
      "http://publicaccess.rochdale.gov.uk/online-applications",
      "http://publicaccess.salford.gov.uk/publicaccess",
      "http://planning.stockport.gov.uk/PlanningData-live",
      "https://planning.wigan.gov.uk/online-applications"
      // tameside is not idox: https://www.tameside.gov.uk/planning/applications
    ];

    for (let i = 0; i < idoxSites.length; i++) {
      const data = await scrapeIdox(idoxSites[i]);
      // await storeInGeoFirestore(data, geocollection);
    }
  } catch (e) {
    logger.error(e);
  }
}

doScrape();
