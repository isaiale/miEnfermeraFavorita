import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: null, // Evita el registro automático de otro SW
      strategies: 'injectManifest', // Usa tu service worker personalizado
      srcDir: 'public', // Ubicación de tu SW
      filename: 'service-worker.js', // Nombre de tu service worker
      manifest: { // Configura los detalles del manifest para que se genere automáticamente
        name: 'Mi Aplicación',
        short_name: 'App',
        description: 'Aplicación web para productos de enfermeria de mi enfermera favorita',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
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
      }
    })
  ]
});
