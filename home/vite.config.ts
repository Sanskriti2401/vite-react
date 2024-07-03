import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      federation({
        name: 'home',
        remotes: {
          pdp: "http://localhost:3001/assets/remoteEntry.js",
          cart: "http://localhost:3002/assets/remoteEntry.js",
          addtocart: "http://localhost:3003/assets/remoteEntry.js",
        },
        shared: ['react','react-dom'] 
      })
  ],

  build: {
    target: 'esnext' // needed to final build
  },
})