const { scrapeWeekly } = require("./src/idox/scrapeWeekly.js");
const { pushNotify } = require("./lib/pushNotify");

const target = process.argv[2];

if (!target) {
  console.log(
    "Target must be supplied as first arg like: \n https://pa.manchester.gov.uk/online-applications"
  );
  process.exit(0);
}

async function scrape() {
  await scrapeWeekly(target);
  await pushNotify(target);
  console.log("Singe scrape done!");
}

scrape();
