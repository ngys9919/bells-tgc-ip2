// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": "http://localhost:3000",
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend-express/frontend-react/build',  // Output build to the backend directory
    emptyOutDir: true,  // Clear the build folder before building
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",  // Proxy backend API requests during dev
    },
  },
  base: '/',  // Ensure relative URLs are used
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
          $br: 25px;  // This will apply globally to all .sass files
        `,
      },
      scss: {
        additionalData: `
          @use "./src/styles/mixins.scss";  // Make sure path is correct
        `,
      },
    },
  },
})
