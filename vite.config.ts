import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';   // ✅ Already correct

export default defineConfig({
  base: '/',  // ✅ Base URL for the app
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'go_route/src'),  // ✅ Alias for '@/'
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // ✅ Django server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
