describe('Prueba E2E', () => {
  // // Visita la página principal
  it('Debería cargar la página principal y el contenido', () => {
    cy.visit('http://localhost:5173/');
  });
});
