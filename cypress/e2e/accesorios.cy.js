describe('Accesorios - Pruebas E2E', () => {
  beforeEach(() => {
    cy.visit('/accesorioss'); // Ruta del componente Accesorios
  });

  it('Debe cargar el componente correctamente y mostrar productos', () => {
    cy.get('.name-spinner').should('contain', 'Cargando...'); // Verifica que el spinner aparece
    cy.get('.container-related-products').should('exist'); // Verifica que se cargan productos
  });

  it('Debe filtrar productos con descuento', () => {
    cy.get('input.form-check-input[type="checkbox"]').check(); // Marca "Solo con descuento"
    cy.get('.discount-icon').should('exist'); // Verifica que todos los productos tienen descuento
  });

  it('Debe permitir limpiar filtros', () => {
    cy.get('input[name="min"]').clear().type('200');
    cy.get('input[name="max"]').clear().type('500');
    cy.get('input.form-check-input[type="checkbox"]').check();
    cy.get('.btn-secondary').click(); // Haz clic en "Limpiar Filtros"
    cy.get('input[name="min"]').should('have.value', '0'); // Verifica que los filtros están reseteados
    cy.get('input[name="max"]').should('have.value', '1000');
    cy.get('input.form-check-input[type="checkbox"]').should('not.be.checked');
  });

  it('Debe mostrar el mensaje de "No hay productos disponibles" si no hay resultados', () => {
    cy.get('input[name="min"]').clear().type('99999'); // Aplica un filtro que no devuelva resultados
    cy.get('.text-center p').should('contain', 'No hay productos disponibles.');
  });
});
