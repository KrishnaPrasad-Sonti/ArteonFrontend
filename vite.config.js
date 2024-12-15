import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://projectarteon.up.railway.app', // Your backend URL
        changeOrigin: true,
        secure: false,  // If you're using HTTPS, this should be true
        rewrite: (path) => path.replace(/^\/api/, '')  // Removes '/api' from the path
      }
    }
  }
})
