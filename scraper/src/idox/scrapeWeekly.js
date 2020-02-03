import cheerio from "cheerio";
import fetchPage from '../lib/fetchPage.js'
import { URLSearchParams } from "url"

/**
 * Scrape weekly planning lists from a council's idox system
 * @param rootURL - eg https://idoxpa.westminster.gov.uk/online-applications
 */
export default async function scrapeWeekly(rootURL) {
  console.log(`Starting idox scrape: ${rootURL}`);
  await scrapeFullList(rootURL, "DC_Validated");
  // await scrapeFullList(rootURL, "DC_Decided");
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

  // Get latest list date
  const searchForm = await fetchPage(`${rootURL}/search.do?action=weeklyList&searchType=Application`);
  const latestListDate = cheerio.load(searchForm)("select#week option").first().attr("value");
  console.log(latestListDate);

  // Get first page of the chosen list type
  const params = new URLSearchParams();
  params.append("searchCriteria.ward", "");
  params.append("week", latestListDate);
  params.append("dateType", listType);
  params.append("searchType", "Application");

  const firstPage = await fetchPage(`${rootURL}/weeklyListResults.do?action=firstPage`, {
    method: "POST",
    body: params
  });
  const detailURLs = getDetailURLs(firstPage);
  console.log(detailURLs);
  console.log(firstPage);
  // return;
  // await getAllApplicationDetails(rootURL, detailURLs);

}

/**
 * Get the URLs of the application detail pages from the weekly list
 * @param html
 * @returns {Array}
 */
function getDetailURLs(html) {
  const $ = cheerio.load(html);
  const urls = [];
  $('a[href*="applicationDetails.do"]').each((i, a) => {
    urls.push($(a).attr("href"));
  });
  return urls;
}

/**
 * Loop through an array of detail page URLs
 * @param rootURL
 * @param detailURLs
 * @returns {Promise<Array>}
 */
async function getAllApplicationDetails(rootURL, detailURLs) {
  let planningApps = [];
  for (let i = 0; i < detailURLs.length; i++) {
    const url = new URL(rootURL).origin + detailURLs[i];
    const page = await getPage(url, rootURL);
    planningApps.push({
      url,
      ...getDetailFields(page)
    });
  }
  return planningApps;
}
