import { test, expect } from '@playwright/test';

test('Prueba de Integración - Filtros y Paginación en Productos', async ({ page }) => {
  // Ir a la página de productos (ajusta la URL a tu entorno local o de producción)
  await page.goto('http://localhost:5173/productos/661e80554fe28882b7029321'); // Cambia esta URL si es necesario

  // Verificar que la página cargue correctamente
  await expect(page).toHaveTitle(/Mi Enfermera Favorita/);

  // Esperar explícitamente hasta que los productos se carguen
  const productCards = page.locator('.card');
  await productCards.first().waitFor(); // Esperar a que el primer producto esté presente
  const productCount = await productCards.count(); // Obtener el número de productos
  expect(productCount).toBeGreaterThan(0); // Verifica que haya productos

  // Filtrar por nombre o descripción (buscar un producto específico)
  const searchInput = page.locator('input[type="text"]');
  await searchInput.fill('Filipina Cindy');
  await searchInput.press('Enter');

  // Verificar que los productos filtrados contengan 
  await expect(page.locator('.text-product h3')).toHaveText(/Filipina Cindy/);

  // Verificar la paginación
  const paginationItems = page.locator('.pagination .page-item');
  await expect(paginationItems).toHaveCount(1);
});
