import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1. Intercept all frontend outgoing traffic that starts with "/api"
      '/api': {
        // 2. Change this port number to match your exact backend server port (e.g., 5000 or 8000)
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
