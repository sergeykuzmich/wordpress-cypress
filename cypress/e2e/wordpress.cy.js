describe('WordPress', () => {
  it('installed', () => {
    cy.visit('/')
    cy.contains('WordPress')
  })

  it('has the proper version', () => {
    cy.visit('/')
    cy.contains(`WordPress ${Cypress.env('WP_CORE')}`)
  })

  it('credentials are valid', () => {
    cy.login()
  })
})
