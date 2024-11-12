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
        start_url: "./",
        scope: "./",
        icons: [
          {
            src: './icon-192x192.png', // Ruta relativa para iconos
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './icon-512x512.png', // Ruta relativa para iconos
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webmanifest}'], // Archivos a incluir en la caché
        runtimeCaching: [
          {
            urlPattern:  /\/api\//, // Ajusta con la URL de tu API si necesitas caché offline para solicitudes de red
            handler: 'NetworkFirst', // Estrategia para la API: intenta primero la red y usa caché si no hay conexión
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50, // Limita el número de entradas
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cachea por 7 días
              }
            }
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)$/, // Archivos de imagen
            handler: 'CacheFirst', // Para imágenes: usa caché primero, para disponibilidad offline
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60 // Cachea por 30 días
              }
            }
          },
          {
            urlPattern: /.*\.(?:js|css|html)$/, // Archivos estáticos de JavaScript, CSS y HTML
            handler: 'StaleWhileRevalidate', // Usa la caché pero actualiza en segundo plano
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60 // Cachea por 7 días
              }
            }
          }
        ],
        offlineFallback: {
          pageFallback: '/index.html' // Crea esta página en `public` para mostrarla cuando no hay conexión
        }
      }
    }),
  ],
  // build: {
  //   sourcemap: true // Habilita el mapa de fuentes para depuración
  // }
});
