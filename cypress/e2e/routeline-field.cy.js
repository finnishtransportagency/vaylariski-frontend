/// <reference path="../support/index.d.ts" />

describe("Route field works", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.getByDataCyId("calculation-type-dropdown").as("calculation-type-button");
    cy.get("@calculation-type-button").click();
    cy.getByDataCyId("calculation-type-routeline").click();

    cy.get('input[id="routename"]').as("routeline-input");
    cy.getByDataCyId("routename.id")
      .find("button")
      .as("routeline-dropdown-button");

    cy.getByDataCyId("submit-button").as("submit-button");
  });

  it("Has correct initial values in the dropdown", () => {
    cy.get("@routeline-dropdown-button").click();
    cy.contains("FIEMA-FISKV (15.3m Inbound)");
  });

  it("Correct fields are disabled initially with correct tooltips", () => {
    //Check routeline field
    cy.get("@routeline-input").should("be.empty");
    cy.get("@routeline-input").trigger("mouseover");
    cy.get("#routeline-tooltip").contains("Reitti vaaditaan");

    //Check submit button
    cy.get("@submit-button").scrollIntoView();
    cy.get("@submit-button").should("be.disabled");
    cy.get("@submit-button").trigger("mouseover", { force: true });
    cy.get("#submit-button-tooltip").contains(
      "Korjaa seuraavat asiat lähettääksesi arvot:"
    );
    cy.get("#submit-button-tooltip").contains("- Valitse reitti");
  });

  it("Selecting a routeline enables the submit button", () => {
    //Select the routeline FIORR-FIKHA
    cy.get("@routeline-dropdown-button").click();
    cy.get('ul[id="routename-listbox"]')
      .find("li")
      .contains("FIORR-FIKHA (via Ruotsinsalmi)")
      .click();

    //Check submit button
    cy.get("@submit-button").scrollIntoView();
    cy.get("@submit-button").should("be.enabled");
  });
});
