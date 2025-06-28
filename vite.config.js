import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: '/wedding_invitation/',
  server: {
    port: 3000,
    open: true
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
}));
