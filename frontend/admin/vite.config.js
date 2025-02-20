import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: './admin.html'
      }
    },
    outDir: '../../public',
    assetsDir: 'a',
    sourcemap: false,
    minify: 'terser',
    cssMinify: 'lightningcss'
  },
  server: {
   proxy:{
      '/api': 'http://localhost:4000',
    }
  },
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      app: fileURLToPath(new URL('../../', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  }
})
