/// <reference path="../support/index.d.ts" />

describe("Table works", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.getByDataCyId("calculation-type-dropdown").as("calculation-type-button");
    cy.get("@calculation-type-button").click();
    cy.getByDataCyId("calculation-type-navigationline").click();

    cy.get('input[id="vaylat"]').as("wayarea-input");
    cy.getByDataCyId("vaylat.id").find("button").as("wayarea-dropdown-button");

    cy.get('input[id="navline.starting_gdo_gid"]').as("gid-input");
    cy.getByDataCyId("navline.starting_gdo_gid.id")
      .find("button")
      .as("gid-dropdown-button");

    cy.getByDataCyId("submit-button").as("submit-button");

    cy.intercept(
      "POST",
      "http://localhost:3000/vaylariski/rest/fairway/calculate_risk?vaylat=100"
    ).as("getIntermediatePoints");
  });

  describe("Table works", () => {
    it("Populating table works with initial columns", () => {
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .find("li")
        .contains("100 - Oulu - Kemi väylä")
        .click();
      cy.get("@submit-button").click();
      cy.wait("@getIntermediatePoints").then((interception) => {
        cy.get('div[class*="riv-table"]').should("exist");
        cy.get('div[role*="row"]').should("exist");
        // Has cells
        cy.get('div[role*="gridcell"').should("exist");
        // Has initial columns
        cy.contains("span", "Indeksi").should("exist");
        cy.contains("span", "GDO_GID").should("exist");
        cy.contains("span", "VAYLAT").should("exist");
        cy.contains("span", "RIV summa").should("exist");
      });
    });

    it("Select columns works", () => {
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .find("li")
        .contains("100 - Oulu - Kemi väylä")
        .click();
      cy.get("@submit-button").click();
      cy.wait("@getIntermediatePoints").then((interception) => {
        cy.contains("button", "Valitse sarakkeet").should("exist").click();
        cy.contains("label", "RIV mutka").should("exist").click();
        cy.get("body").click("topRight");
        // Has previously set columns
        cy.contains("span", "Indeksi").should("exist");
        cy.contains("span", "GDO_GID").should("exist");
        cy.contains("span", "VAYLAT").should("exist");
        cy.contains("span", "RIV summa").should("exist");
        // Has newly added column
        cy.contains("span", "RIV mutka").should("exist");
      });
    });

    it("Selecting table filter", () => {
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .find("li")
        .contains("100 - Oulu - Kemi väylä")
        .click();
      cy.get("@submit-button").click();
      cy.wait("@getIntermediatePoints").then((interception) => {
        // Has more rows than one header row + one data row
        cy.get("div[role*='row']").should("have.length.gte", 2);
        cy.contains("button", "Lisää suodatus").should("exist").click();
        // Set parameter
        cy.get("div[id='filterConstant']").should("exist").click();
        cy.contains("li", "Indeksi").click();
        cy.get("div[id='filterOperator']").should("exist").click();
        cy.contains("li", "=").click();
        cy.get("input[id='filterValue']").should("exist").type("0");
        cy.contains("button", "Käytä").click();
        // Has header row and one data row
        cy.get("div[role*='row']").should("have.length", 2);
        // Has row with index value of 0
        cy.contains("div[role='gridcell'][aria-colindex=1]", 0);
      });
    });
  });
});
