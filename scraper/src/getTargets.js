const { hasuraRequest } = require("./lib/hasuraRequest");
const queries = require("./queries");

async function getTargets(scraper) {
  const res = await hasuraRequest({
    query: queries.GET_SCRAPE_TARGETS_BY_TYPE,
    variables: {
      scraper
    }
  });
  return res.data.council;
}

getTargets('idox');

exports = {
  getTargets
};
