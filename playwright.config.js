import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './testplaywright/', // Directorio donde estarán tus pruebas
  timeout: 30000, // Tiempo máximo por prueba en milisegundos
  retries: 2, // Reintenta pruebas fallidas
  reporter: 'html', // Reporte en formato HTML
  use: {
    headless: true, // Ejecutar las pruebas en modo headless
    viewport: { width: 1280, height: 720 }, // Resolución de la ventana
    video: 'retain-on-failure', // Grabar video en fallos
    screenshot: 'only-on-failure', // Captura de pantalla en fallos
  },
});
