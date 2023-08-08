import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import armor from 'unplugin-vue-armor/vite'
import inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), inspect(), armor()],
})
