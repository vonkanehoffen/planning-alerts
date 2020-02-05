import { snakeCase } from 'change-case'

function scrapeTable(table) {
  let scrape = {};
  Cypress.$(table).find('tr').each((i, v) => {
    const key = Cypress.$(v).find('th').first().text().trim();
    const val = Cypress.$(v).find('td').first().text().trim();
    scrape[snakeCase(key)] = val;
  });
  return scrape
}
context('Idox scraper', () => {
  it("Scrapes Westminster", () => {
    cy.visit("https://idoxpa.westminster.gov.uk/online-applications/search.do?action=weeklyList&searchType=Application");
    cy.contains("Validated in this week").click();
    cy.get('.button').contains("Search").click();
    cy.get('ul#searchresults li').first().find('a').click();
    let scrape = {};
    cy.get('.tabcontainer').then(tab => {
      scrape = scrapeTable(tab);
    });
    cy.get('ul.tabs').contains('Further Information').click();
    cy.get('.tabcontainer').then(tab => {
      scrape.further_information = scrapeTable(tab);
    });
    cy.get('ul.tabs').contains('Important Dates').click();
    cy.get('.tabcontainer').then(tab => {
      scrape.important_dates = scrapeTable(tab);
      console.log(scrape);
    });
    cy.storeValidated("plops");
  })
});
