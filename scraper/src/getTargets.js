const { hasuraRequest } = require("./lib/hasuraRequest");
const queries = require("./queries");

async function getTargets(scraper) {
  await hasuraRequest({
    query: queries.GET_SCRAPE_TARGETS_BY_TYPE,
    variables: {
      scraper
    }
  });
}

getTargets('idox');

exports = {
  getTargets
};
