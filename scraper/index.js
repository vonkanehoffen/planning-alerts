const { scrapeWeekly } = require("./src/idox/scrapeWeekly.js");

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

/**
 * Scrape all councils...
 * Temp - TODO: Launch separate processes in PM2
 * @returns {Promise<void>}
 */
async function scrapeAll() {
  for (let rootURL of idoxSites) {
    await scrapeWeekly(rootURL);
  }
}

scrapeAll();

// scrapeWeekly("https://planning.cambridgeshire.gov.uk/online-applications/");
// scrapeWeekly("http://planning.cornwall.gov.uk/online-applications");
// scrapeWeekly("https://publicaccess.buckscc.gov.uk/online-applications");
// scrapeWeekly("https://pa.manchester.gov.uk/online-applications");
// scrapeWeekly("https://idoxpa.westminster.gov.uk/online-applications");
