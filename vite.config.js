import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/wedding_invitation/',  // tambahkan ini sesuai nama repo kamu
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
