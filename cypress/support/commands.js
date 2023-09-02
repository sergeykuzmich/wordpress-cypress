// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.visit('/wp-admin')
  cy.wait(500)
  cy.get('[name=loginform]').should('exist')
  cy.get('input[name=log]').type('wordpress')
  cy.get('input[name=pwd]').type('wpassword')
  cy.get('input[name=wp-submit]').click()
  cy.contains('Howdy, wordpress')
})

Cypress.Commands.add('logout', () => {
  cy.visit('/wp-admin')
  cy.contains('Howdy, wordpress')
  cy.get('[class="menupop with-avatar"] [class="ab-sub-wrapper"]').invoke('show')
  cy.get('[id=wp-admin-bar-logout] a').click()
  cy.get('[name=loginform]').should('exist')
})

Cypress.Commands.add('supress_guttenberg_wizzard', () => {

  // WordPress 5.2 throws exception `Failed to execute 'send' on 'XMLHttpRequest'`
  // when you're leaving `Add New` page with unsaved changes prompt
  Cypress.env('WP_CORE') == '5.2' && Cypress.on('uncaught:exception', (popup) => {
    return false
  });

  // 5.0 ... 5.1
  cy.get('body').then((body) => {
    let popover = body.find('[class*=nux-dot-tip]');
    popover.length && cy.get('[class*=nux-dot-tip__disable]').click()
  })
})
