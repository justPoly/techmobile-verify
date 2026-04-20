import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/backend',     // Points to XAMPP (port 80)
        changeOrigin: true,
        secure: false,
      }
    }
  }
})