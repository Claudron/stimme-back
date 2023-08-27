import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Proxy configuration
const proxySettings = {
  '/api': 'http://127.0.0.1:8000',
  '/auth': 'http://127.0.0.1:8000',
  '/users': 'http://127.0.0.1:8000',
  '/practice': 'http://127.0.0.1:8000',
  '/media': 'http://127.0.0.1:8000',
};

// Convert the proxy settings for use with Vite
const viteProxy = Object.entries(proxySettings).reduce((acc, [key, value]) => {
  acc[key] = {
    target: value,
    changeOrigin: true,
  };
  return acc;
}, {});

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProduction ? '/staticfiles/' : '/',
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../staticfiles'),
  },
  server: {
    proxy: viteProxy,
  },
});
