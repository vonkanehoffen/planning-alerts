const { request } = require("../lib/request");
const { snakeCase } = require("change-case");
const cheerio = require("cheerio");
const { storeScrape } = require("../lib/hasura");

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
 * @param listType {('DC_Validated'|'DC_Decided')}
 * @returns {Promise<Array>}
 */
async function scrapeFullList(root, listType) {
  const rootURL = new URL(root);

  // Get latest list date

  const searchForm = await request({
    uri: `${rootURL}/search.do?action=weeklyList&searchType=Application`
  });
  const latestListDate = searchForm("select#week option")
    .first()
    .attr("value");
  console.log(latestListDate);

  // Get request args from the form

  const firstUri = searchForm("form[name=searchCriteriaForm]").attr("action");
  const firstPageUri = `${rootURL.origin}${firstUri}`;
  let params = searchForm("form[name=searchCriteriaForm]").serialize();
  params = params.replace(/dateType=.*&/, `dateType=${listType}&`);
  console.log(params);
  console.log("URI: ", firstPageUri);

  // Get first page of the chosen list type

  let listPage = await request({
    uri: firstPageUri,
    method: "POST",
    body: params
  });
  let detailURLs = [];
  detailURLs = getDetailURLs(listPage);
  if (detailURLs.length < 1) {
    console.log("Single app only");
    detailURLs = [firstUri];
  }

  console.log(detailURLs);

  // Scrape PA detail, looping over pagination
  while (detailURLs.length > 0) {
    for (const detailURL of detailURLs) {
      const uri = `${rootURL.origin}${detailURL}`;
      let scrape = {
        list_type: listType,
        scraper: "idox",
        url: uri
      };

      // Scrape summary
      const summaryPage = await request({
        uri
      });
      scrape.summary = scrapeTableData(summaryPage);
      scrape.reference = scrape.summary.reference;

      // Scrape further info
      const furtherInfoUri = summaryPage("#subtab_details").attr("href");
      const furtherInfoPage = await request({
        uri: `${rootURL.origin}${furtherInfoUri}`
      });
      scrape.further_information = scrapeTableData(furtherInfoPage);

      // Scrape dates
      const datesUri = summaryPage("#subtab_dates").attr("href");
      const datesPage = await request({ uri: `${rootURL.origin}${datesUri}` });
      scrape.important_dates = scrapeTableData(datesPage);

      // Scrape contacts
      // TODO: Needs different scrape and is on main tab (but always blank?) for westminster
      //  Also do we need it? Agent name is on Further info tab, so this is just email addresses.

      console.log("scrape:", scrape);
      await storeScrape(scrape);
    }

    // Get next page of the list
    const nextLink = listPage("#searchResultsContainer a.next")
      .first()
      .attr("href");
    if (nextLink) {
      console.log("Next page: ", nextLink);
      listPage = await request({ uri: `${rootURL.origin}${nextLink}` });
      detailURLs = getDetailURLs(listPage);
    } else {
      console.log("All pages scraped.");
      detailURLs = [];
    }
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
  page('#searchresults a[href*="applicationDetails.do"]').each((i, a) => {
    urls.push(page(a).attr("href"));
  });
  return urls;
}

function scrapeTableData(page) {
  let scrape = {};
  page(".tabcontainer tr").each((i, v) => {
    // console.log("EACH: ", i, v);
    const el = cheerio.load(v);
    const key = el("th")
      .first()
      .text()
      .trim();
    const val = el("td")
      .first()
      .text()
      .trim();
    scrape[snakeCase(key)] = val;
  });
  return scrape;
}

exports.scrapeWeekly = scrapeWeekly;
