import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/Borrowed-Order/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'Borrowed-Order')
    }
  },
  root: './',
  build: {
    outDir: 'dist'
  }
})
