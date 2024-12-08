describe('Home Page Tests', () => {
  it('Debería cargar correctamente la página principal', () => {
    cy.visit('/'); // Navega al Home de tu aplicación
    cy.get('h1').contains('Bienvenido'); // Verifica que el encabezado contiene "Bienvenido"
  });

});
