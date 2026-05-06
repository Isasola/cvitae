import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // La raíz del proyecto es el mismo directorio donde está este archivo
  root: '.',
  // Carpeta pública para archivos estáticos
  publicDir: 'public',
  // Alias para que los imports con '@' funcionen
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Carpeta de salida (la que Netlify publica)
    outDir: 'dist',
    rollupOptions: {
      // Entrada explícita: el index.html en la raíz
      input: path.resolve(__dirname, 'index.html'),
    },
  },
  server: {
    port: 3000,
  },
})
