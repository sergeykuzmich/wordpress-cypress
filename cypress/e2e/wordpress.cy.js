describe('WordPress', () => {
  it('installed', () => {
    cy.visit('/')
    cy.contains('WordPress')
  })

  it('has the proper version', () => {
    cy.visit('/')
    cy.contains('WordPress 6.3')
  })

  it('credentials are valid', () => {
    cy.login()
  })
})
