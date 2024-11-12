import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: null, // No registra automáticamente un nuevo SW
      strategies: 'injectManifest', // Usa `injectManifest` para respetar tu SW y manifest existentes
      srcDir: 'public', // Ubicación de tu SW y manifest
      filename: 'service-worker.js', // Nombre de tu SW existente
      manifest: false, // Desactiva la generación automática del manifest
    })
  ]
});
