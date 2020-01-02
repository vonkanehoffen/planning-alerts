import cheerio from "cheerio";
import config from "../../../config";
import fetch from "node-fetch";
import cookie from "cookie";
import { URLSearchParams } from "url";
import logger from "../../logger";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

let sessionCookie;

/**
 * Start the scrape for an idox powered planning portal
 * @param rootURL
 * @returns {Promise<Array>}
 */
export default async function start(rootURL) {
  logger.log("warn", `Starting idox scrape: ${rootURL}`);

  // Testing...
  // let validatedPlanningApps = JSON.parse(
  //   await readFile("./dummyData/runOutputs/rochdale1-partial.json", "utf8")
  // );

  const validatedPlanningApps = await scrapeFullList(rootURL, "DC_Validated");
  const decidedPlanningApps = await scrapeFullList(rootURL, "DC_Decided");
  const results = [...validatedPlanningApps, ...decidedPlanningApps];

  logger.log(
    "warn",
    `Finished idox scrape with ${results.length} results: ${rootURL}`
  );
  return results;
}

/**
 * Scrape a full weekly planning list data set
 * Iterates over pages etc.
 *
 * @param rootURL
 * @param dateType
 * @returns {Promise<Array>}
 */
async function scrapeFullList(rootURL, dateType) {
  logger.info("scrapeFullList", { rootURL, dateType });
  const searchFormHTML = await getSearchForm(rootURL);
  const listDate = getLatestListDate(searchFormHTML);

  const weeklyList = await getWeeklyList(rootURL, listDate, dateType);

  const detailURLs = getDetailURLs(weeklyList);
  let planningApps = await getAllApplicationDetails(rootURL, detailURLs);
  let nextURL = getNextURL(weeklyList);
  while (nextURL) {
    const nextPage = await getPage(nextURL, rootURL);
    const detailURLs = getDetailURLs(nextPage);
    let apps = await getAllApplicationDetails(rootURL, detailURLs);
    planningApps.push(...apps);
    nextURL = getNextURL(nextPage);
  }
  return planningApps;
}

/**
 * Fetch the search form HTML
 * Pull the session cookie from the response
 * @param rootURL
 * @returns {Promise<{sessionCookie, searchFormHTML: *}>}
 */
async function getSearchForm(rootURL) {
  const searchFormURL = `${rootURL}/search.do?action=weeklyList&searchType=Application`;
  const searchForm = await fetch(searchFormURL, {
    headers: {
      "User-Agent": config.userAgent
    }
  });
  const searchFormHTML = await searchForm.text();
  logger.info(`getSearchForm: ${searchFormURL}`, { searchFormHTML });
  const cookies = cookie.parse(searchForm.headers.get("set-cookie"));
  sessionCookie = cookie.serialize("JSESSIONID", cookies.JSESSIONID);
  return searchFormHTML;
}

/**
 * Get the dat of the latest weekly list
 * @param searchFormHTML
 * @returns {*|*|*|*|{loc, name, type, value}}
 */
function getLatestListDate(searchFormHTML) {
  const $searchForm = cheerio.load(searchFormHTML);
  return $searchForm("select#week option")
    .first()
    .attr("value");
}

/**
 * Fetch the weekly list HTML
 * @param rootURL
 * @param week
 * @param dateType
 * @returns {Promise<void>}
 */
async function getWeeklyList(rootURL, week, dateType) {
  const params = new URLSearchParams();

  params.append("searchCriteria.ward", "");
  params.append("week", week);
  params.append("dateType", dateType);
  params.append("searchType", "Application");

  const firstPageURL = `${rootURL}/weeklyListResults.do?action=firstPage`;

  const firstPage = await fetch(firstPageURL, {
    method: "POST",
    headers: {
      "User-Agent": config.userAgent,
      Cookie: sessionCookie
    },
    body: params
  });

  const text = await firstPage.text();
  logger.info(`getWeeklyList: ${firstPageURL}`, { text });
  return text;
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
 * Get field values from an application detail page
 * @param html
 * @returns {Object}
 */
function getDetailFields(html) {
  const $ = cheerio.load(html);
  const getField = name =>
    $(`th:contains(${name})`)
      .parent()
      .find("td")
      .first()
      .text()
      .trim();
  return {
    reference: getField("Reference"),
    alternativeReference: getField("Alternative Reference"),
    applicationValidated: getField("Application Validated"),
    address: getField("Address"),
    proposal: getField("Proposal"),
    decision: getField("Decision\n"),
    decisionIssuedDate: getField("Decision Issued Date"),
    appealStatus: getField("Appeal Status"),
    appealDecision: getField("Appeal Decision")
  };
}

/**
 * Fetch a page (with session cookie set)
 * @param rootURL
 * @param url
 * @returns {Promise<*>}
 */
async function getPage(url, rootURL) {
  // Check it's absolute and correct if not...
  // Pagination URLs come both ways?!
  try {
    new URL(url);
  } catch (e) {
    url = new URL(rootURL).origin + url;
  }
  const page = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": config.userAgent,
      Cookie: sessionCookie
    }
  });

  const text = await page.text();
  logger.info(`getPage: ${url}`, { text });
  return text;
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

/**
 * Get the pagination "next page" URL if it exists.
 * @param html
 * @returns {*}
 */
function getNextURL(html) {
  const $ = cheerio.load(html);
  return $(".pager .next").attr("href");
}
