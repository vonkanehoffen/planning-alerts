import cheerio from "cheerio";
import fetchPage from '../lib/fetchPage.js'

/**
 * Scrape weekly planning lists from a council's idox system
 * @param rootURL - eg https://idoxpa.westminster.gov.uk/online-applications
 */
export default async function scrapeWeekly(rootURL) {
  console.log(`Starting idox scrape: ${rootURL}`);
  await scrapeFullList(rootURL, "DC_Validated");
  await scrapeFullList(rootURL, "DC_Decided");
}

/**
 * Scrape a full weekly planning list data set
 * Iterates over pages etc.
 *
 * @param rootURL
 * @param listType
 * @returns {Promise<Array>}
 */
async function scrapeFullList(rootURL, listType) {
  const searchForm = await fetchPage(`${rootURL}/search.do?action=weeklyList&searchType=Application`);
  const latestListDate = cheerio.load(searchForm)("select#week option").first().attr("value");
  console.log(latestListDate);
}
