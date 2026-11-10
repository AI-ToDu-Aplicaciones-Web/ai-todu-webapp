import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath,URL} from 'node:url';
export default defineConfig({
  plugins:[vue()],base:'./',
  build:{rollupOptions:{input:{landing:fileURLToPath(new URL('./index.html',import.meta.url)),inventory:fileURLToPath(new URL('./inventory.html',import.meta.url))}}},
  server:{proxy:{'/warehouse-api':{target:'http://127.0.0.1:5080',changeOrigin:true,rewrite:path=>path.replace(/^\/warehouse-api/,'/api/v1')}}}
});
