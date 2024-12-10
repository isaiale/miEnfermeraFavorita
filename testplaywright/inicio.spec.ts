import { test, expect } from '@playwright/test';

test('Home page has correct title', async ({ page }) => {
  // Abre la página
  await page.goto('http://localhost:5173'); // Cambia la URL si es necesario

  // Verifica el título
  await expect(page).toHaveTitle(/Mi Enfermera Favorita/);
});
