/// <reference path="../support/index.d.ts" />

describe("Compare field works", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.getByDataCyId("calculation-type-dropdown").as("calculation-type-button");
    cy.get("@calculation-type-button").click();
    cy.getByDataCyId("calculation-type-compare").click();

    cy.get('input[id="vaylat"]').as("wayarea-input");
    cy.getByDataCyId("vaylat.id").find("button").as("wayarea-dropdown-button");

    cy.get('input[id="navline.starting_gdo_gid"]').as("gid-input");
    cy.getByDataCyId("navline.starting_gdo_gid.id")
      .find("button")
      .as("gid-dropdown-button");

    cy.get('input[id="routename"]').as("routeline-input");
    cy.getByDataCyId("routename.id")
      .find("button")
      .as("routeline-dropdown-button");

    cy.getByDataCyId("submit-button").as("submit-button");
  });

  it("Has correct initial values in both dropdowns", () => {
    cy.get("@wayarea-dropdown-button").click();
    cy.contains("7010 - Akonniemen väylät");

    cy.get("@routeline-dropdown-button").click();
    cy.contains("FIEMA-FISKV (15.3m Inbound)");
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
    cy.get("#submit-button-tooltip").contains(
      "- Valitse navigointilinja ja reitti"
    );
  });

  describe("Selecting only one field but leaving the other empty", () => {
    it("Submit button should still be disabled if no routeline has been chosen", () => {
      //Select the wayarea with id 100
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .find("li")
        .contains("100 - Oulu - Kemi väylä")
        .click();

      //Check routeline field
      cy.get("@routeline-input").should("be.empty");

      //Check submit button
      cy.get("@submit-button").scrollIntoView();
      cy.get("@submit-button").should("be.disabled");
      cy.get("@submit-button").trigger("mouseover", { force: true });
      cy.get("#submit-button-tooltip").contains(
        "Korjaa seuraavat asiat lähettääksesi arvot:"
      );
      cy.get("#submit-button-tooltip").contains(
        "- Valitse navigointilinja ja reitti"
      );
    });
    it("Submit button should still be disabled if no wayarea has been chosen", () => {
      //Select the routeline FIORR-FIKHA
      cy.get("@routeline-dropdown-button").click();
      cy.get('ul[id="routename-listbox"]')
        .find("li")
        .contains("FIORR-FIKHA (via Ruotsinsalmi)")
        .click();

      //Check wayarea field
      cy.get("@wayarea-input").should("be.empty");

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
      cy.get("#submit-button-tooltip").contains(
        "- Valitse navigointilinja ja reitti"
      );
    });
  });
});
