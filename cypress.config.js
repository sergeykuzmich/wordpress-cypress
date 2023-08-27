const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "specPattern": [
      "cypress/e2e/wordpress.cy.js",
      "cypress/e2e/*.cy.js",
    ],
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
