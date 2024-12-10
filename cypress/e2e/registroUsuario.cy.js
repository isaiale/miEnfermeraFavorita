describe('Pruebas E2E para Registro de Usuario', () => {
    const urlBase = 'http://localhost:5173'; 
  
    beforeEach(() => {
      cy.visit(`${urlBase}/registroUsuario`); // Cambia la ruta si es necesario
    });
  
    it('Debería mostrar errores cuando los campos están vacíos y se intenta enviar el formulario', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Ingrese su nombre completo.').should('be.visible');
      cy.contains('Ingrese su apellido.').should('be.visible');
      cy.contains('Ingrese su correo.').should('be.visible');
      cy.contains('Ingrese su telefono.').should('be.visible');
      cy.contains('Ingrese una contraseña.').should('be.visible');
      cy.contains('Debes aceptar los términos y condiciones.').should('be.visible');
      cy.contains('Acepta el captcha.').should('be.visible');
    });

  });
  