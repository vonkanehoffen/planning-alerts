import { request } from "../lib/request";
import { snakeCase } from "change-case";
import cheerio from "cheerio";
import { storeScrape, storeScrapeLog } from "../lib/hasura";
import { Council } from "../generated/graphql";

/**
 * Scrape weekly planning lists from a council's idox system
 * @param council - portal url eg https://idoxpa.westminster.gov.uk/online-applications
 */
export async function scrapeWeekly(
  council: Pick<Council, "id" | "portal_url">
) {
  console.log(`Starting idox scrape: ${council.portal_url}`);
  await storeScrapeLog("idox", council.id, "START_SCRAPE_WEEKLY", {
    rootUrl: council.portal_url
  });
  await scrapeFullList(council, ListType.DC_Validated);
  await scrapeFullList(council, ListType.DC_Decided);
  await storeScrapeLog("idox", council.id, "END_SCRAPE_WEEKLY", {
    rootUrl: council.portal_url
  });
}

enum ListType {
  DC_Validated = "DC_Validated",
  DC_Decided = "DC_Decided"
}

export interface Scrape {
  list_type: ListType;
  scraper: string;
  url: string;
  reference: string;
  summary: tableData;
  further_information?: tableData;
  important_dates?: tableData;
}

/**
 * Scrape a full weekly planning list data set
 * Iterates over pages etc.
 */
async function scrapeFullList(
  council: Pick<Council, "id" | "portal_url">,
  listType: ListType
) {
  const rootURL = new URL(council.portal_url);

  try {
    // Get latest list date

    const searchForm = await request({
      uri: `${rootURL}/search.do?action=weeklyList&searchType=Application`
    });
    const latestListDate = searchForm("select#week option")
      .first()
      .attr("value");
    console.log("Scraping list date: ", latestListDate);

    // Get request args from the form

    const firstUri = searchForm("form[name=searchCriteriaForm]").attr("action");
    const firstPageUri = `${rootURL.origin}${firstUri}`;
    let params = searchForm("form[name=searchCriteriaForm]").serialize();
    params = params.replace(/dateType=.*&/, `dateType=${listType}&`);
    console.log("Scraping first page, URL: ", firstPageUri);

    // Get first page of the chosen list type

    let listPage = await request({
      uri: firstPageUri,
      method: "POST",
      body: params
    });
    let detailURLs = getDetailURLs(listPage);
    if (detailURLs.length < 1) {
      detailURLs = [firstUri];
    }

    console.log("Scraping detail URLs: ", detailURLs);

    // Scrape PA detail, looping over pagination
    while (detailURLs.length > 0) {
      for (const detailURL of detailURLs) {
        const uri = `${rootURL.origin}${detailURL}`;
        let scrape: Scrape = {
          list_type: listType,
          scraper: "idox",
          url: uri,
          summary: {},
          reference: ""
        };

        // Scrape summary
        const summaryPage = await request({
          uri
        });
        scrape.summary = scrapeTableData(summaryPage);
        scrape.reference = scrape.summary.reference;

        // If there's no reference, something's gone wrong...
        // TODO: This needs to handle 302 / network errors as well. Currently blows...
        if (!scrape.reference) {
          await storeScrapeLog("idox", council.id, "NO_SCRAPED_REFERENCE", {
            scrape,
            html: summaryPage.html()
          });
          continue;
        }

        // Scrape further info
        const furtherInfoUri = summaryPage("#subtab_details").attr("href");
        const furtherInfoPage = await request({
          uri: `${rootURL.origin}${furtherInfoUri}`
        });
        scrape.further_information = scrapeTableData(furtherInfoPage);

        // Scrape dates
        const datesUri = summaryPage("#subtab_dates").attr("href");
        const datesPage = await request({
          uri: `${rootURL.origin}${datesUri}`
        });
        scrape.important_dates = scrapeTableData(datesPage);

        // Scrape contacts
        // TODO: Needs different scrape and is on main tab (but always blank?) for westminster
        //  Also do we need it? Agent name is on Further info tab, so this is just email addresses.

        await storeScrape(scrape, council.id);
      }

      // Get next page of the list
      const nextLink = listPage("#searchResultsContainer a.next")
        .first()
        .attr("href");
      if (nextLink) {
        console.log("Scraping next page, URL: ", nextLink);
        listPage = await request({ uri: `${rootURL.origin}${nextLink}` });
        detailURLs = getDetailURLs(listPage);
      } else {
        console.log("All pages scraped.");
        detailURLs = [];
      }
    }
  } catch (e) {
    await storeScrapeLog("idox", council.id, "SCRAPE_LIST_ERROR", {
      root: council.portal_url,
      listType,
      message: e.message
    });
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

type tableData = {
  // reference: string
  [key: string]: any;
};

function scrapeTableData(page: CheerioAPI): tableData {
  let scrape = {};
  page(".tabcontainer tr").each((i, v) => {
    const el = cheerio.load(v);
    const key = el("th")
      .first()
      .text()
      .trim();
    scrape[snakeCase(key)] = el("td")
      .first()
      .text()
      .trim();
  });
  return scrape;
}
