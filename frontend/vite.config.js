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
        target: 'http://localhost/backend',
        changeOrigin: true,
        secure: false,

        // 🔥 THIS IS THE IMPORTANT FIX
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            
            // Forward custom admin token header
            if (req.headers['x-admin-token']) {
              proxyReq.setHeader(
                'X-Admin-Token',
                req.headers['x-admin-token']
              );
            }

            // Also forward Authorization if you ever use it
            if (req.headers['authorization']) {
              proxyReq.setHeader(
                'Authorization',
                req.headers['authorization']
              );
            }
          });
        }
      }
    }
  }
})