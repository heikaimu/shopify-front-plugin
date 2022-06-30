/*
 * @Date: 2022-05-26 15:21:49
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 15:54:01
 * @FilePath: /shopify-front-plugin/vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'BackgroundPuzzle',
      fileName: 'background-puzzle'
    },
    rollupOptions: {
      external: [
        'vue'
      ],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    vue(),
    // 添加下面这块
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  server: {
    host: '0.0.0.0',
    open: true
  }
})
