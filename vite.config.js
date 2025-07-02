export default defineConfig({
  base: '/', // Pastikan ini sesuai dengan base URL
  plugins: [react()],
  server: {
    historyApiFallback: true, // Kritikal untuk BrowserRouter
    port: 3000
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});