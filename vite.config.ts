import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';   

export default defineConfig({
  base: '/', 
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'go_route/src'),  
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
