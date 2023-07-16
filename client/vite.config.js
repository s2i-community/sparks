import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000, // This is the port which we will use in docker
    strictPort: true,
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
    watch: {
      usePolling: true
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:9000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
