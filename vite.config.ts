import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// ============================================================
// TODO: CONECTAR ANTES DE DEPLOY
// ANTHROPIC_API_KEY     → Netlify > Site settings > Environment variables
// SUPABASE_URL          → Netlify > Site settings > Environment variables  
// SUPABASE_ANON_KEY     → Netlify > Site settings > Environment variables
// SUPABASE_SERVICE_KEY  → Netlify > Site settings > Environment variables
// NETLIFY_URL           → Reemplazar "TU-SITIO.netlify.app" en index.html OG tags
// ============================================================

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
})
