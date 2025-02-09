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

  it('can be added with shortcode', () => {
    const spoiler = { 
      title: 'Who Survives in the Final Episode? 🎬', 
      content: 'Against all odds, the main character fakes their death and escapes to another country.'
    }

    cy.open_new_post_page()

    // Create post with spoiler
    cy.get('[class*=editor-post-title__input]').type('Shortcode Spoiler') 
    cy.get('p[class*=block-editor-default-block-appender]').click()
    cy.get('p[class*=block-editor-rich-text__editable]').last().focus()
    .type(`[spoiler title="${spoiler.title}"]${spoiler.content}[/spoiler]{esc}`)

    cy.get('[class*=edit-post-header] [class*=editor-post-publish]').click()
    cy.get('[class*=editor-post-publish-panel] [class*=editor-post-publish-button]')
      .click()

    // Preview the post
    cy.contains('View Post').click()

    // Check spoiler behaviour
    cy.contains(spoiler.content).should('be.not.visible')
    cy.contains(spoiler.title).click()
    cy.contains(spoiler.content).should('be.visible')
    cy.contains(spoiler.title).click()
    cy.contains(spoiler.content).should('be.not.visible')
  })

  it('can be added with Guttenberg', () => {
    const spoiler = { 
      title: 'The Secret Ingredient in Grandma’s Cookies 🍪', 
      content: 'It’s actually a pinch of cinnamon! That’s what makes them so special.'
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
    cy.contains('View Post').click()

    // Check spoiler behaviour
    cy.contains(spoiler.content).should('be.not.visible')
    cy.contains(spoiler.title).click()
    cy.contains(spoiler.content).should('be.visible')
    cy.contains(spoiler.title).click()
    cy.contains(spoiler.content).should('be.not.visible')
  })

  it('can be added multiple times', () => {
    const spoilers = [{ 
      title: 'Hidden Feature in Our New App Update 📱', 
      content: 'You can now double-tap the logo in the settings to unlock a dark mode easter egg!'
    },{ 
      title: 'Unexpected Plot Twist in the Latest Mystery Novel 📖', 
      content: 'The detective was the real culprit all along, covering up their own crimes!'
    }]

    cy.open_new_post_page()

    // Create post with spoiler
    cy.get('[class*=editor-post-title__input]').type('Multiple Spoilers') 
    for(const spoiler of spoilers) {
      cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
      cy.get('[class*=editor-inserter__menu] input[type=search]').type('inline')
      cy.get('[class*=editor-block-list-item-inline-spoilers-block').click()  
      cy.get('div[class*=edit-post-header] button[class*=inserter][class*=toggle]')
      .click()
      cy.get('[class=wp-block-inline-spoilers-block] [class=spoiler-title]')
      .last().type(spoiler.title)
    cy.get('[class=wp-block-inline-spoilers-block] [class=spoiler-content] [role=textbox]')
      .last().type(spoiler.content)
    }

    cy.get('[class*=edit-post-header] [class*=editor-post-publish]').click()
    cy.get('[class*=editor-post-publish-panel] [class*=editor-post-publish-button]')
      .click()

    // Preview the post
    cy.contains('View Post').click()

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
