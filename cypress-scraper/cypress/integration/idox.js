import metaDefs from '../support/metaDefs'

context('Idox scraper', () => {
  it("Scrapes Westminster", () => {
    cy.visit("https://idoxpa.westminster.gov.uk/online-applications/search.do?action=weeklyList&searchType=Application");
    cy.contains("Validated in this week").click();
    cy.get('.button').contains("Search").click();
    cy.get('ul#searchresults li').first().find('a').click();
    let scrape = {};
    cy.get('#simpleDetailsTable').then(table => {
      Cypress.$(table).find('tr').each((i, v) => {
        const key = Cypress.$(v).find('th').first().text().trim();
        const val = Cypress.$(v).find('td').first().text().trim();
        scrape[key] = val;
      });
      console.log(scrape);
    });
    // metaDefs.subtab_summary.forEach(metaTitle => {
    //   scrape.cy.get('#simpleDetailsTable th').contains(metaTitle).parent().find('td')
    // })
  })
});
