const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173", // Ajusta el puerto si es necesario
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: false, // Desactiva el archivo de soporte si no necesitas configuraciones avanzadas
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
