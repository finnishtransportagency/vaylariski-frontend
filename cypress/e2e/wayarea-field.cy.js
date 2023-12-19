/// <reference path="../support/index.d.ts" />

describe("Wayarea field works", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('input[id="vaylat"]').as("wayarea-input");
    cy.getByDataCyId("vaylat.id")
      .find("button")
      .as("wayarea-dropdown-button");
    cy.get('input[id="navline.starting_gdo_gid"]').as("gid-input");
    cy.getByDataCyId("navline.starting_gdo_gid.id")
      .find("button")
      .as("gid-dropdown-button");
    cy.getByDataCyId("submit-button").as("submit-button");
  });

  it("Has correct initial values in the dropdown", () => {
    cy.get("@wayarea-dropdown-button").click();
    cy.contains("7010 - Akonniemen väylät");
  });

  it("Correct fields are disabled initially with correct tooltips", () => {
    //Check wayarea field
    cy.get("@wayarea-input").should("be.empty");
    cy.get("@wayarea-input").trigger("mouseover");
    cy.get("#wayarea-tooltip").contains("VAYLAT id vaaditaan");

    //Check GDO GID field
    cy.get("@gid-input").should("be.empty");
    cy.get("@gid-input").should("be.disabled");
    cy.get("@gid-input").trigger("mouseover", { force: true });
    cy.get("#gdo-gid-tooltip").contains("Valitse ensin väylän tunnus");

    //Check submit button
    cy.get("@submit-button").scrollIntoView();
    cy.get("@submit-button").should("be.disabled");
    cy.get("@submit-button").trigger("mouseover", { force: true });
    cy.get("#submit-button-tooltip").contains(
      "Korjaa seuraavat asiat lähettääksesi arvot:"
    );
    cy.get("#submit-button-tooltip").contains("- VAYLAT id vaaditaan");
    cy.get("#submit-button-tooltip").contains(
      "- Valitulle väylälle ei löydy navigointilinjoja"
    );
  });

  describe("Selecting a wayarea", () => {
    it("Selecting wayarea with GDO_GIDS enables GDO_GID-input with options and enables submit button", () => {
      //Select the wayarea with id 100
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .find("li")
        .contains("100 - Oulu - Kemi väylä")
        .click();

      //Check GDO GID field
      cy.get("@gid-input").should("be.enabled");
      cy.get("@gid-dropdown-button").click();
      cy.get('ul[id="navline.starting_gdo_gid-listbox"]')
        .find("li")
        .contains("227903");

      //Check submit button
      cy.get("@submit-button").scrollIntoView();
      cy.get("@submit-button").should("be.enabled");
    });

    it("Selecting wayarea with no GDO_GID keeps GDO_GID-input and submit button disabled and has correct tooltips", () => {
      //Select the wayarea with id 7010
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .find("li")
        .contains("7010 - Akonniemen väylät")
        .click();

      //Check notification
      cy.contains(
        "Navigointilinjan tunnusta ei löytynyt valitulle väylälle id:llä 7010"
      );

      //Check GDO GID field
      cy.get("@gid-input").should("be.disabled");
      cy.get("@gid-input").trigger("mouseover", { force: true });
      cy.get("#gdo-gid-tooltip").contains(
        "Valitulle väylälle ei löydy tunnuksia"
      );

      //Check submit button
      cy.get("@submit-button").scrollIntoView();
      cy.get("@submit-button").should("be.disabled");
      cy.get("@submit-button").trigger("mouseover", { force: true });
      cy.get("#submit-button-tooltip").contains(
        "Korjaa seuraavat asiat lähettääksesi arvot:"
      );
      cy.get("#submit-button-tooltip").contains(
        "- Valitulle väylälle ei löydy navigointilinjoja"
      );
    });
  });
});
