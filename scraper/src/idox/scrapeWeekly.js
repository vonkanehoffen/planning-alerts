const { request } = require('../lib/request');
const { snakeCase } = require('change-case');
const cheerio = require('cheerio');

/**
 * Scrape weekly planning lists from a council's idox system
 * @param rootURL - eg https://idoxpa.westminster.gov.uk/online-applications
 */
async function scrapeWeekly(rootURL) {
  console.log(`Starting idox scrape: ${rootURL}`);
  await scrapeFullList(rootURL, "DC_Validated");
  // await scrapeFullList(rootURL, "DC_Decided");
}

/**
 * Scrape a full weekly planning list data set
 * Iterates over pages etc.
 *
 * @param root
 * @param listType
 * @returns {Promise<Array>}
 */
async function scrapeFullList(root, listType) {
  const rootURL = new URL(root);

  // Get latest list date

  const searchForm = await request({uri: `${rootURL}/search.do?action=weeklyList&searchType=Application`});
  const latestListDate = searchForm("select#week option").first().attr("value");
  console.log(latestListDate);

  // Get request args from the form

  const firstUrl = searchForm("form[name=searchCriteriaForm]").attr('action');
  const uri = `${rootURL.origin}${firstUrl}`;
  let params = searchForm("form[name=searchCriteriaForm]").serialize();
  params = params.replace(/dateType=.*&/, `dateType=${listType}&`)
  console.log(params);
  console.log("URI: ", uri);

  // Get first page of the chosen list type

  const firstPage = await request({uri,
    method: "POST",
    body: params,
  });
  const detailURLs = getDetailURLs(firstPage);
  console.log(detailURLs);

  for (const detailURL of detailURLs) {
    let scrape = {};
    const summaryPage =  await request({ uri: `${rootURL.origin}${detailURL}` });
    scrape.summaryPage = scrapeTableData(summaryPage);
    console.log("scrape:", scrape);
  }
  // return;
  // await getAllApplicationDetails(rootURL, detailURLs);

}

/**
 * Get the URLs of the application detail pages from the weekly list
 * @param page
 * @returns {Array}
 */
function getDetailURLs(page) {
  const urls = [];
  page('a[href*="applicationDetails.do"]').each((i, a) => {
    urls.push(page(a).attr("href"));
  });
  return urls;
}

function scrapeTableData(page) {
  let scrape = {};
  page('.tabcontainer tr').each((i, v) => {
    // console.log("EACH: ", i, v);
    const el = cheerio.load(v);
    const key = el('th').first().text().trim();
    const val = el('td').first().text().trim();
    scrape[snakeCase(key)] = val;
  });
  return scrape
}

exports.scrapeWeekly = scrapeWeekly;
