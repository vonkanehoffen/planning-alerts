import { hasuraRequest } from "./lib/hasuraRequest";
import * as queries from "./queries";

export async function getTargets(scraper) {
  const res = await hasuraRequest({
    query: queries.GET_SCRAPE_TARGETS_BY_TYPE,
    variables: {
      scraper
    }
  });
  return res.data.council;
}

getTargets('idox');

