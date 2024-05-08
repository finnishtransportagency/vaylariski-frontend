/// <reference path="../support/index.d.ts" />

describe("Boat field works", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.getByDataCyId("boat-tab").as("boat-tab");
    cy.getByDataCyId("parametres-tab").as("parametres-tab");

    cy.get("@boat-tab").click();
    cy.get("input[id=boat]").as("boat-input");

    cy.get('input[id="boat.length"]').as("boat-length-input");
    cy.get('input[id="boat.beam"]').as("boat-beam-input");
    cy.get('input[id="boat.draft"]').as("boat-draft-input");
  });

  it("Has correct initial values", () => {
    cy.get("@boat-tab").click();
    cy.get("@boat-input").invoke("val").should("equal", "");
    cy.get("@boat-length-input").invoke("val").should("equal", "210");
    cy.get("@boat-beam-input").invoke("val").should("equal", "30");
    cy.get("@boat-draft-input").invoke("val").should("equal", "10");
  });

  it("Changing boat", () => {
    cy.get("@boat-tab").click();
    cy.get("@boat-input").type("2940");
    cy.get('ul[id="boat-listbox"]').find("li").contains("2940").click();
    cy.get("input[id=boat]")
      .invoke("val")
      .should(
        "equal",
        "2940 - Nyhamn-Rödskär väylä, pituus: 218, leveys: 31.8,  syväys: 6.8"
      );
    cy.get("@boat-length-input").invoke("val").should("equal", "218");
    cy.get("@boat-beam-input").invoke("val").should("equal", "31.8");
    cy.get("@boat-draft-input").invoke("val").should("equal", "6.8");
  });

  it("Changing tab doesn't remove boat values", () => {
    cy.get("@boat-tab").click();
    cy.get("@boat-input").type("2940");
    cy.get('ul[id="boat-listbox"]').find("li").contains("2940").click();
    cy.get("input[id=boat]")
      .invoke("val")
      .should(
        "equal",
        "2940 - Nyhamn-Rödskär väylä, pituus: 218, leveys: 31.8,  syväys: 6.8"
      );
    cy.get("@boat-length-input").invoke("val").should("equal", "218");
    cy.get("@boat-beam-input").invoke("val").should("equal", "31.8");
    cy.get("@boat-draft-input").invoke("val").should("equal", "6.8");
    cy.get("@parametres-tab").click();
    cy.get("@boat-tab").click();
    cy.get("input[id=boat]")
      .invoke("val")
      .should(
        "equal",
        "2940 - Nyhamn-Rödskär väylä, pituus: 218, leveys: 31.8,  syväys: 6.8"
      );
    cy.get("@boat-length-input").invoke("val").should("equal", "218");
    cy.get("@boat-beam-input").invoke("val").should("equal", "31.8");
    cy.get("@boat-draft-input").invoke("val").should("equal", "6.8");
  });
});
