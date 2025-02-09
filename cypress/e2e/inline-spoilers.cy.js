describe('Inline Spoilers', () => {
  beforeEach(() => {
    cy.login()
  })

  it('plugin can be activated', () => {
    cy.get('li[id=menu-plugins]').click()
    cy.get('a[href*="action=activate&plugin=inline-spoilers"]').click()
  })

  it('guttenberg block is initialized', () => {
    cy.open_new_post_page()

    cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
    cy.get('[class*=editor-inserter__menu] input[type=search]').type('inline')
    cy.get('[class*=editor-block-list-item-inline-spoilers-block')
      .should('be.visible')    
  })

  it('can be added with guttenberg', () => {
    const spoiler = { 
      title: 'The orpan', 
      content: 'Phasellus tempor tellus quis felis dignissim, a elementum purus malesuada.'
    }

    cy.open_new_post_page()

    // Create post with spoiler
    cy.get('[class*=editor-post-title__input]').type('Spoiled Content') 
    cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
    cy.get('[class*=editor-inserter__menu] input[type=search]').type('inline')
    cy.get('[class*=editor-block-list-item-inline-spoilers-block]').click()  
    cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
    cy.get('[class=wp-block-inline-spoilers-block] [class=spoiler-title]')
      .type(spoiler.title)
    cy.get('[class=wp-block-inline-spoilers-block] [class=spoiler-content] [role=textbox]')
      .type(spoiler.content)
    cy.get('[class*=edit-post-header] [class*=editor-post-publish]').click()
    cy.get('[class*=editor-post-publish-panel] [class*=editor-post-publish-button]')
      .click()

    // Preview the post
    cy.contains('View Post')
      .click()

    // Check spoiler behaviour
    cy.contains(spoiler.content).should('be.not.visible')
    cy.contains(spoiler.title).click()
    cy.contains(spoiler.content).should('be.visible')
    cy.contains(spoiler.title).click()
    cy.contains(spoiler.content).should('be.not.visible')
  })

  it('can be added multiple times', () => {
    const spoilers = [{ 
      title: 'The first one', 
      content: 'Etiam augue urna, ullamcorper dapibus ex quis, elementum tristique libero.'
    },{ 
      title: 'The second spoilier', 
      content: 'Phasellus nec turpis semper, fermentum magna ut, lobortis lacus.'
    }]

    cy.open_new_post_page()

    // Create post with spoiler
    cy.get('[class*=editor-post-title__input]').type('Multiple Spoilers') 
    cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
    cy.get('[class*=editor-inserter__menu] input[type=search]').type('inline')
    cy.get('[class*=editor-block-list-item-inline-spoilers-block').click()  
    Cypress.env('WP_CORE') > 5.4 && cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
    cy.get('[class=wp-block-inline-spoilers-block] [class=spoiler-title]')
      .type(spoilers[0].title)
    cy.get('[class=wp-block-inline-spoilers-block] [class=spoiler-content] [role=textbox]')
      .type(spoilers[0].content)

    cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
    cy.get('[class*=editor-inserter__menu] input[type=search]').type('inline')
    cy.get('[class*=editor-block-list-item-inline-spoilers-block').click()  
    Cypress.env('WP_CORE') > 5.4 && cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
    cy.get('[class=wp-block-inline-spoilers-block] [class=spoiler-title]')
      .last()
      .type(spoilers[1].title)
    cy.get('[class=wp-block-inline-spoilers-block] [class=spoiler-content] [role=textbox]')
      .last()
      .type(spoilers[1].content)

    cy.get('[class*=edit-post-header] [class*=editor-post-publish]').click()
    cy.get('[class*=editor-post-publish-panel] [class*=editor-post-publish-button]')
      .click()

    // Preview the post
    cy.contains('View Post')
      .click()

    // Check spoilers behaviour
    cy.contains(spoilers[0].content).should('be.not.visible')
    cy.contains(spoilers[1].content).should('be.not.visible')

    cy.contains(spoilers[0].title).click()
    cy.contains(spoilers[0].content).should('be.visible')
    cy.contains(spoilers[1].content).should('be.not.visible')

    cy.contains(spoilers[0].title).click()
    cy.contains(spoilers[0].content).should('be.not.visible')
    cy.contains(spoilers[1].content).should('be.not.visible')

    cy.contains(spoilers[0].title).click()
    cy.contains(spoilers[1].title).click()
    cy.contains(spoilers[0].content).should('be.visible')
    cy.contains(spoilers[1].content).should('be.visible')

    cy.contains(spoilers[0].title).click()
    cy.contains(spoilers[0].content).should('be.not.visible')
    cy.contains(spoilers[1].content).should('be.visible')
  })

  it('plugin can be deactivated', () => {
    cy.get('li[id=menu-plugins]').click()
    cy.get('a[href*="action=deactivate&plugin=inline-spoilers"]').click()
  })
})
