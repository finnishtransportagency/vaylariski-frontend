describe('Initial loading works', () => {
  it('Finds the headertext "VäyläRiski', () => {
    cy.visit('http://localhost:3000')
    cy.contains("VäyläRiski")
  })
})