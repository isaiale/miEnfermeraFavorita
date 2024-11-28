import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // base: './', // Configura la base de las rutas como relativa
  plugins: [react(), VitePWA({
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
    includeAssets: [
      '/index.html',
      '/manifest.json',
      '/favicon.ico',
      '/icon-192x192.png',
      '/icon-512x512.png',
      '/logo.jpg',
    ],      
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,webmanifest}'], // Archivos a incluir en la caché
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/back-end-enfermera\.vercel\.app\/api\//, // Ajusta con la URL de tu API si necesitas caché offline para solicitudes de red
          handler: 'NetworkFirst', 
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
      // Configura `index.html` como la página de fallback offline
      // offlineFallback: {
      //   pageFallback: '/index.html'
      //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
      // }
    }
  }), sentryVitePlugin({
    org: "uthh-org",
    project: "javascript-react",
    authToken: process.env.SENTRY_AUTH_TOKEN, // Usar el token de Sentry desde las variables de entorno,
    release: {
      name: process.env.SENTRY_RELEASE || `MiEnfermeraFavorita-web-pwa@${new Date().toISOString()}`,
      inject: true, // Asegura que Sentry inyecte la versión del release en el bundle para identificar errores correctamente
      finalize: true, // Finaliza el release automáticamente
    },
  }), sentryVitePlugin({
    org: "uthh-org",
    project: "javascript-react"
  })],
  build: {
    outDir: 'build',
    sourcemap: true
  },
});