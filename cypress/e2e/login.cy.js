describe('Pruebas E2E para el Login', () => {
    beforeEach(() => {
      // Visitar la página de inicio de sesión antes de cada prueba
      cy.visit('/login'); // Asegúrate de que la ruta sea correcta
    });
  
    it('Debería cargar correctamente la página de Login', () => {
      // Verifica que el formulario de inicio de sesión esté visible
      cy.get('h2').contains('Inicio de Sesión').should('be.visible');
      cy.get('#cajaTextoEmail').should('be.visible');
      cy.get('#cajaTextoPassword').should('be.visible');
    });
  
    it('Debería mostrar errores si se envía el formulario vacío', () => {
      cy.get('button[type="submit"]').click();
      cy.get('.text-danger').should('contain', 'Ingrese su correo');
      cy.get('.text-danger').should('contain', 'Ingrese una contraseña');
    });
  
    it('Debería iniciar sesión correctamente con credenciales válidas', () => {
      // Simular valores válidos
      cy.intercept('POST', '**/api/auth/login', {
        statusCode: 200,
        body: {
          token: 'fakeToken123',
          redirect: '/',
        },
      }).as('loginRequest');
  
      cy.get('#cajaTextoEmail').type('20200699@uthh.edu.mx');
      cy.get('#cajaTextoPassword').type('Arely1540#');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
  
      // Verificar redirección
      cy.url().should('include', '/');
    });
  
    
  });
  