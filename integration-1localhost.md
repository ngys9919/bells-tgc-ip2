**Full-Stack Integration Using Single localhost**

Now, the link up of the frontend (in the BELLS/TGC-IP2/frontend-react directory) to backend (in the BELLS/TGC-IP2/backend-express directory) for a full stack development using localhost is working. How should I link up the frontend to backend for a full stack development using a single web address url?

To link your frontend (React) and backend (Express) under a **single web address URL**, you need to configure your project so that both the frontend and backend are served from the same domain, with the backend handling API requests and React serving static assets.

Here’s how to achieve this:

### 1. **Serve the React Frontend via Express (Backend)**
You can build your React app and then serve the static files directly from your Express backend. This means that Express will handle both serving your API and serving the React app when you access the root URL (e.g., `http://localhost:3000`).

#### Steps to Set This Up:

1. **Build the React App:**
   In your React project (`frontend-react`), you need to create a production build of your app, which bundles all the assets into static files.

   Run the following command in the `frontend-react` directory:
   ```bash
   npm run build
   ```

   This will create a `build` directory inside the `frontend-react` folder under the path `BELLS-TGC-IP2/backend-express` with all the static assets (HTML, CSS, JS) that can be served by Express.

2. **Configure Express to Serve Static React Files:**
   In your `backend-express` setup, after the API routes, you need to configure Express to serve the built React files.

   Modify your `index.js` file in `backend-express` to serve the static files:

   ```javascript
   const express = require('express');
   const path = require('path');
   const hbs = require('hbs');
   const helpers = require('handlebars-helpers');
   const wax = require('wax-on');

   const app = express();

   // Set up static file serving for React build folder
   app.use(express.static(path.join(__dirname, 'frontend-react/build')));


   // Express Handlebars setup
   app.set('view engine', 'hbs');
   app.set('views', path.join(__dirname, 'views'));

   // Middleware for JSON parsing
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   // Example API route for orders
   app.get('/orders', (req, res) => {
       const orders = [
           { name: 'Order 1' },
           { name: 'Order 2' },
           { name: 'Order 3' },
       ];
       res.json(orders);  // Respond with JSON data
   });

   // Catch-all route to serve the React app (React handles routing)
   app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, 'frontend-react/build', 'index.html'));
   });

   // Start the server
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

   Here’s how this works:
   - `express.static(path.join(__dirname, 'frontend-react/build'))`: This middleware serves static files (HTML, CSS, JS) from the React app’s build folder.
   - `app.get('*', ...)`: This catch-all route serves the React `index.html` file for any route that isn’t already handled by the API routes, allowing React to handle client-side routing (e.g., React Router).

3. **Run the Backend and Frontend Together:**
   - Make sure both the backend and frontend are set up to work together under a single domain (`http://localhost:3000`).
   - When you run the backend, Express will serve both the React frontend and handle API requests.

   Run the following in your `backend-express` directory:
   ```bash
   node index.js
   ```

   Now, when you visit `http://localhost:3000`, the React app will be loaded, and any API requests (such as fetching orders) will be made to `http://localhost:3000/api`.

### 2. **Proxy API Calls During Development:**
During development, you can continue to run the frontend React server (`localhost:5173`) and backend Express server (`localhost:3000`) separately. React will send API requests to `localhost:3000`.

To handle API requests to the backend during development, set up a proxy in your `vite.config.js` for the frontend.

#### Example `vite.config.js`:
In your `frontend-react` directory, configure the proxy in Vite:

```javascript
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
})
```

This way, API requests made by the frontend (React) to `/api` will automatically be forwarded to the backend server running on `http://localhost:3000`.

### 3. **Final Setup:**
- **Frontend (React)**: Hosted at `http://localhost:3000` after the build and served by Express.
- **Backend (Express)**: API endpoints (like `/api`) are accessible at `http://localhost:3000/api`, and the frontend is served from the same domain.

***Verify and Test:***

After running npm run build in the frontend-react folder, start your Express server with node index.js in the backend-express directory.
Navigate to http://localhost:3000 in your browser.

Your React app should be served from the same URL as your backend API, and all static files (JS, CSS, images, etc.) should load correctly.

### Summary of Flow:
1. During development: The React frontend runs on `localhost:5173` (with proxy set up) and communicates with the backend at `localhost:3000`.
2. After production build: The React app is served as static files by Express, and the API routes are available at the same `localhost:3000`.

This will give you a unified experience where both your frontend and backend are accessible under the same URL (`http://localhost:3000`), allowing for smooth full-stack development.