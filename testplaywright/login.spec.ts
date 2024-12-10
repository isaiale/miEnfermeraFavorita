import { test, expect } from '@playwright/test';

test.describe('Pruebas de integración para el formulario de Login', () => {
  
    test('Muestra mensajes de error si los campos están vacíos', async ({ page }) => {
        await page.goto('http://localhost:5173/login');
      
        // Dispara el evento que genera los mensajes de error
        await page.click('button:has-text("Iniciar Sesión")');
      
        // Usa un selector más específico si es necesario
        const errorCorreo = page.locator('text="Ingrese su correo."');
        const errorPassword = page.locator('text="Ingrese una contraseña."');
    });

  test('Permite escribir en los campos de correo y contraseña', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    
    // Llenar el campo de correo
    const inputCorreo = page.locator('#cajaTextoEmail');
    await inputCorreo.fill('usuario@ejemplo.com');
    await expect(inputCorreo).toHaveValue('usuario@ejemplo.com');

    // Llenar el campo de contraseña
    const inputPassword = page.locator('#cajaTextoPassword');
    await inputPassword.fill('contraseña123');
    await expect(inputPassword).toHaveValue('contraseña123');
  });

  test('Muestra un mensaje de error si el servidor responde con error', async ({ page }) => {
    await page.route('**/url-login-usuarios', (route) => {
      // Simula una respuesta de error del servidor
      console.log('Interceptando solicitud al servidor');
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ 
          message: 'Credenciales inválidas',
        }),
      });
    });
  
    await page.goto('http://localhost:5173/login');
  
    // Llenar campos
    await page.locator('#cajaTextoEmail').fill('usuario@ejemplo.com');
    await page.locator('#cajaTextoPassword').fill('contraseña123');
  
    // Enviar formulario
    await page.click('button:has-text("Iniciar Sesión")');
  
    // Selector más específico para el mensaje
    const mensajeError = page.locator('.text-danger:has-text("Credenciales inválidas")');
  });
  
});
