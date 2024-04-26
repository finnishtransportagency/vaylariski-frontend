/// <reference path="../support/index.d.ts" />

describe("Wayarea field works", () => {
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
  });

  it("Has correct initial values in the dropdown", () => {
    cy.get("@wayarea-dropdown-button").click();
    cy.contains("100 - Oulu");
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
    cy.get("#submit-button-tooltip").contains("- Valitse navigointilinja");
  });

  describe("Selecting a wayarea", () => {
    it("Selecting wayarea with GDO_GIDS enables GDO_GID-input with options and enables submit button", () => {
      //Select the wayarea with id 100
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .should("exist")
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

    it("Do not show wayareas with no GDO_GID", () => {
      //Select the wayarea with id 5920
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .find("li")
        .should("not.contain", "5920 - Maringinlahden väylä");

      //Check submit button
      cy.get("@submit-button").scrollIntoView();
      cy.get("@submit-button").should("be.disabled");
      cy.get("@submit-button").trigger("mouseover", { force: true });
      cy.get("#submit-button-tooltip").contains(
        "Korjaa seuraavat asiat lähettääksesi arvot:"
      );
      cy.get("#submit-button-tooltip").contains("- Valitse navigointilinja");
    });

    it("Switching tabs doesn't change wayarea value", () => {
      cy.get("@wayarea-dropdown-button").click();
      cy.get('ul[id="vaylat-listbox"]')
        .find("li")
        .contains("100 - Oulu - Kemi väylä")
        .click();

      cy.getByDataCyId("user-defined-angle-tab").click();
      cy.getByDataCyId("parametres-tab").click();
      cy.get("@wayarea-input")
        .invoke("val")
        .should("equal", "100 - Oulu - Kemi väylä");
    });
  });
});
