**Full-Stack Integration Using Separate localhost**

I'm using Vite-React framework for my frontend and Express with Handlebars (using hbs package) for my backend connecting to MySQL database for my web application. I would like to use server-side rendering for the order management module in the backend using Express and Handlebars (that is, not using React). How should I link up the frontend (in the BELLS/TGC-IP2/frontend-react directory) to backend (in the BELLS/TGC-IP2/backend-express directory) for a full stack development using localhost?

To link your frontend (Vite-React) and backend (Express with Handlebars) together on localhost, you can follow these steps:

### **1. Set up Express to Serve the Handlebars Views**
Since you're using Handlebars for server-side rendering on the backend, ensure that your Express app is configured to use Handlebars for rendering views.

***1. Setup Handlebars with hbs, handlebars-helpers, and wax-on***
You are using hbs, which is a wrapper around express-handlebars. Here's the correct way to set it up with handlebars-helpers and wax-on:

Install necessary dependencies:

```bash
npm install hbs handlebars-helpers wax-on
```

***2. Backend Setup (index.js):***

```javascript
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const helpers = require('handlebars-helpers');
const wax = require('wax-on');

// Initialize the express app
const app = express();

// Register handlebars helpers using handlebars-helpers
helpers({
    handlebars: hbs.handlebars,  // Connect the helpers to hbs
});

// Register custom helpers (for #extends and #block) using wax-on
wax.on(hbs.handlebars);  // Enable wax-on for additional Handlebars features

// Set up Handlebars engine with Express
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route: Orders
app.get('/orders', (req, res) => {
    const orders = [
        { name: 'Order 1' },
        { name: 'Order 2' },
        { name: 'Order 3' },
    ];
    res.render('orders', { orders });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

***3. Handlebars Layout (views/layouts/main.hbs)***
In this layout, we use {{content}} to render the content inside the main layout.

```handlebars
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{#block "title"}}{{/block}}</title>
</head>
<body>
    <header>
        <h1>My Web App</h1>
    </header>
    <div class="container">
        {{#block "content"}}{{/block}}
    </div>
</body>
</html>
```

***4. Content Page (views/orders.hbs)***
This file will use the #extends and #block helpers to render content within the main layout. Here we define a block for the body content.

```handlebars
{{#extends 'main'}}  <!-- Use the main layout -->
{{#block "title"}}{{title}}{{/block}}
    {{#block 'content'}}
        {{title}}
        <h2>Orders</h2>
        <ul>
            {{#each orders}}
                <li>{{name}}</li>
            {{/each}}
        </ul>
    {{/block}}
{{/extends}}
```

***5. Directory Structure:***
Ensure your project structure follows this format:

```pgsql
/backend-express
  /views
    /layouts
      main.hbs  <-- Main layout with body placeholder
    orders.hbs  <-- Content page for orders
  /public  <-- Static files like CSS or JS
  index.js  <-- Backend Express setup
```

### **2. Set Up React Frontend (Vite)**
Your React app will call the Express API to interact with the backend.

Install Axios (or fetch) for API calls in frontend-react:

```bash
npm install axios
```

Make API requests from React to Express: In one of your React components, you can fetch data from the backend like this:

Now, assuming your React app is running on http://localhost:5173 and the Express backend is running on http://localhost:3000, ensure that your React app makes API calls to the Express backend as needed (using Axios or fetch).

Example Axios API Call (in your React component):

```javascript
import axios from 'axios';
import { useEffect } from 'react';

useEffect(() => {
  axios.get('http://localhost:3000/orders')
    .then((response) => {
      console.log(response.data);  // Handle the data from the backend
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
    });
}, []);
```

### **3. Configure Vite to Proxy Requests to Express**
To link your frontend and backend under a single domain (localhost), you can use Vite’s proxy configuration. This ensures that any request made to an API from React is forwarded to the Express server.

In the vite.config.js file in the frontend-react directory, add the proxy configuration:

```javascript
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

This will ensure that any request to /api from the React frontend is forwarded to the Express backend running on port 3000.

### **4. Running Both Frontend and Backend Servers**
Start the backend: In the backend-express directory, run:

```bash
node index.js
```

Start the frontend: In the frontend-react directory, run:

```bash
npm run dev
```

Now, when you navigate to http://localhost:5173/ (where Vite serves your React app), the frontend will make requests to the backend at http://localhost:3000/api, with the backend responding with the data (or rendered pages in case of server-side rendering).

This setup allows your frontend and backend to work together while keeping your project structure organized.