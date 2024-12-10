describe('Pruebas E2E para el componente Productos', () => {
    beforeEach(() => {
      // Visitar la página de productos antes de cada prueba
      cy.visit('/productos/661e80554fe28882b7029321'); // Ajusta la ruta según tu configuración de React Router
    });
  
    it('Debe cargar los productos correctamente', () => {
      // Verifica que la página cargue correctamente
      cy.contains('Cargando...').should('exist');
      cy.get('.card').should('have.length.at.least', 1); // Asegura que al menos un producto esté cargado
    });
  
  
    it('Debe filtrar productos por descuento', () => {
      // Selecciona la opción de "Solo con descuento"
      cy.get('.form-check-input').check();
  
      // Verifica que los productos mostrados tengan descuento
      cy.get('.discount-icon').should('exist');
      cy.get('.card').each(($el) => {
        cy.wrap($el).should('contain', '%');
      });
    });

  
    it('Debe restablecer los filtros', () => {
      // Aplica algunos filtros
      cy.get('input[type="text"]').type('Accesorio');
      cy.get('input[name="min"]').clear().type('100');
      cy.get('input[name="max"]').clear().type('500');
  
      // Haz clic en el botón "Limpiar Filtros"
      cy.get('button').contains('Limpiar Filtros').click();
  
      // Verifica que los filtros hayan sido restablecidos
      cy.get('input[type="text"]').should('have.value', '');
      cy.get('input[name="min"]').should('have.value', '0');
      cy.get('input[name="max"]').should('have.value', '1000');
    });
  });
  