import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
      solid(),
      federation({
        name: 'addtocart', 
        filename: 'remoteEntry.js', 
        remotes: {
          cart: "http://localhost:3002/assets/remoteEntry.js",
        },
        exposes: { 
          "./AddToCart": "./src/AddToCart.tsx",
          "./placeAddToCart": "./src/placeAddToCart.ts",

        },
        shared: ['react','react-dom'] 
      })
  ],
  build: {
    target: 'esnext' 
  },
})