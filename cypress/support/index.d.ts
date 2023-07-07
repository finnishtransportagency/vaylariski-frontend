declare namespace Cypress {
  interface Chainable {
    getByDataCyId(id: string): Chainable<Element>
  }
}