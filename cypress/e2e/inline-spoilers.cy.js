describe('Inline Spoilers', () => {
  beforeEach(() => {
    cy.login()
  })

  it('can be activated', () => {
    cy.get('li[id=menu-plugins]').click()
    cy.get('a[id=activate-inline-spoilers]').click()
  })

  it('guttenberg block is initialized', () => {
    cy.get('li[id=menu-posts]').click()
    cy.get('a[class=page-title-action]').contains('Add New').click()
    cy.get('div[class=edit-post-header]')
      .get('button[class*=edit-post-header-toolbar__inserter-toggle]')
      .click()
    cy.get('[id=components-search-control-0]').type('inline')
    cy.get('[class*=editor-block-list-item-inline-spoilers-block').should('be.visible')
  })
})
