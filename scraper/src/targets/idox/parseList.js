/**
 * Scrape data from single page HTML result.
 * eg. https://pa.manchester.gov.uk/online-applications/weeklyListResults.do?action=firstPage
 *  or https://pa.manchester.gov.uk/online-applications/pagedSearchResults.do?action=page&searchCriteria.page=2
 * @param $ - cheerio'd DOM
 * @returns {Array}
 */
export default function parseListPage($) {
  let results = [];
  $("#searchresults .searchresult").each((i, r) => {
    const item = {
      title: $(r)
        .find("a")
        .first()
        .text()
        .trim(),
      link: $(r)
        .find("a")
        .first()
        .attr("href"),
      address: $(r)
        .find(".address")
        .text()
        .trim(),
      openForComment: !!$(r).find(".canCommentIndicator").length,
      ref: $(r)
        .find(".metaInfo")
        .html()
        .match(/Ref. No:([\s\S]*?)<span/)[1]
        .trim(),
      validatedDate: $(r)
        .find(".metaInfo")
        .html()
        .match(/Validated:([\s\S]*?)<span/)[1]
        .trim(),
      status: $(r)
        .find(".metaInfo")
        .html()
        .match(/Status:(.*)/s)[1]
        .trim()
    };
    results.push(item);
  });
  return results;
}
