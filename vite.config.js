import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
],
  server: {
    proxy: {
      '/api/register': {
        target: 'https://script.google.com',
        changeOrigin: true,
        secure: true,
        rewrite: () => '/macros/s/AKfycbzl11Z1PxufX0B2t4O9XrX9W3N4mWJOUuAejivJ-E67WL276q6wKuYJ1wFbUIBHIFGgDw/exec',
      },
    },
  },
})
