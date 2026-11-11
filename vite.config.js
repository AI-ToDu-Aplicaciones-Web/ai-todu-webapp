import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const resolveProjectFile = path => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: { alias: { '@': resolveProjectFile('./src') } },
  build: {
    rollupOptions: {
      input: {
        landing: resolveProjectFile('./index.html'),
        inventory: resolveProjectFile('./inventory.html')
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/warehouse-api': {
        target: 'http://127.0.0.1:5080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/warehouse-api/, '/api/v1')
      },
      '/api/v1': { target: 'http://127.0.0.1:5080', changeOrigin: true }
    }
  }
});
