import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
      react(),
      federation({
        name: 'pdp', 
        filename: 'remoteEntry.js', 
        remotes: {
          home: "http://localhost:3000/assets/remoteEntry.js",
          pdp: "http://localhost:3001/assets/remoteEntry.js",
          cart: "http://localhost:3002/assets/remoteEntry.js",
          addtocart: "http://localhost:3003/assets/remoteEntry.js",
        },
        
        exposes: {
          "./PDPContent": "./src/PDPContent.tsx",
        },
        shared: ['react','react-dom'] 
      })
  ],
  build: {
    target: 'esnext' 
  },
})