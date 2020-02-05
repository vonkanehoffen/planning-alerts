const { request } = require('../lib/request');

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
  const firstUrl = searchForm("form[name=searchCriteriaForm]").attr('action');
  const params = searchForm("form[name=searchCriteriaForm]").serialize();
  console.log(params);

  // Get first page of the chosen list type
  // const params = new URLSearchParams({
  //   "searchCriteria.parish": "", // ward for some councils.... ffs.
  //   "week": latestListDate,
  //   "dateType": listType,
  //   "searchType": "Application"
  // });

  const firstPage = await request({uri: `${rootURL.origin}${firstUrl}`,
    method: "POST",
    body: params,
    jar: true
  });
  const detailURLs = getDetailURLs(firstPage);
  console.log(detailURLs);
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

exports.scrapeWeekly = scrapeWeekly;
