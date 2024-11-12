import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './', // Configura la base de las rutas como relativa
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi Aplicación',
        short_name: 'App',
        description: 'Descripción de mi aplicación PWA',
        lang: "es",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        start_url: "./", // Usa una ruta relativa si estás usando `base: './'`
        scope: "./",
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    }),
  ],
});
