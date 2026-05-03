export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/backend',
        changeOrigin: true,
        secure: false,

        // 🔥 THIS IS THE FIX
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            if (req.headers['x-admin-token']) {
              proxyReq.setHeader(
                'X-Admin-Token',
                req.headers['x-admin-token']
              );
            }
          });
        }
      }
    }
  }
});