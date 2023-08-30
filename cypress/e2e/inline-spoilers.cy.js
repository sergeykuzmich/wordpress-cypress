describe('Inline Spoilers', () => {
  beforeEach(() => {
    cy.login()
  })

  it('plugin can be activated', () => {
    cy.get('li[id=menu-plugins]').click()
    cy.get('a[href*="action=activate&plugin=inline-spoilers"]').click()
  })

  it('guttenberg block is initialized', () => {
    cy.get('li[id=menu-posts]').click()
    cy.get('a[class=page-title-action]').contains('Add New').click()
    cy.get('div[class=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()

    // workaround for the first version of guttenberg
    // & cookie controlled tooltips
    cy.get('body').then((body) => {
      let popover = body.find('[class*=nux-dot-tip]');
      popover.length && cy.get(popover[0]).invoke('hide')
    })

    cy.get('[class*=editor-inserter__menu] input[type=search]').type('inline')
    cy.get('[class*=editor-block-list-item-inline-spoilers-block').should('be.visible')
  })

  it('plugin can be deactivated', () => {
    cy.get('li[id=menu-plugins]').click()
    cy.get('a[href*="action=deactivate&plugin=inline-spoilers"]').click()
  })
})
