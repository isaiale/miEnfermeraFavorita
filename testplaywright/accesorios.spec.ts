import { test, expect } from '@playwright/test';

test.describe('Test de integración de Accesorios', () => {
  // Configuración inicial
  test.beforeEach(async ({ page }) => {
    // Simula que la API devuelve productos cargados
    await page.route('**/categoria_productos*', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          { _id: "1", nombre: "Mochilas", precio: 200, descuento: 10, imagenes: [{ url: "image1.jpg" }], descripcion: "Mochila para enfermería" },
          { _id: "2", nombre: "Tijeras", precio: 50, descuento: 0, imagenes: [{ url: "image2.jpg" }], descripcion: "Tijeras quirúrgica" },
          { _id: "3", nombre: "Gorro Oca Unisex", precio: 400, descuento: 20, imagenes: [{ url: "image3.jpg" }], descripcion: "Gorro Oca Unisex" },
        ]),
      })
    );
  });

  test('debe cargar y mostrar los productos correctamente', async ({ page }) => {
    await page.goto('http://localhost:5173/accesorioss'); // Asegúrate de que la URL sea correcta

    // Verificar que los productos se muestren correctamente
    await expect(page.locator('text=Mochilas')).toBeVisible();
    await expect(page.locator('text=Tijeras')).toBeVisible();
    await expect(page.locator('text=Gorro Oca Unisex')).toBeVisible();
  });

  test('debe filtrar productos por precio', async ({ page }) => {
    await page.goto('http://localhost:5173/accesorioss');

    // Establecer un rango de precios
    await page.fill('input[placeholder="Min"]', '50');
    await page.fill('input[placeholder="Max"]', '150');

    await expect(page.locator('text=Gorro Oca Unisex')).not.toBeVisible();
  });
});
