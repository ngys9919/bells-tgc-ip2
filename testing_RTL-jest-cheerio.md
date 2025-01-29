**Full Stack Complete Testing**
For the same web project, I would like to test by means of using React Testing Library (RTL) for the full stack of Vite-React frontend, Express and Handlebars backend and MySQL database, how should I do the testing by giving me illustrated steps with code examples?

Testing your full-stack application involves different layers: the **frontend (React)**, **backend (Express/Handlebars)**, and **database (MySQL)**. We'll focus on the **frontend testing** using **React Testing Library (RTL)** while also covering **backend API testing** with a tool like **Jest**.

---

### **Frontend Testing with React Testing Library**

React Testing Library is designed for testing React components by interacting with the DOM, focusing on user interactions.

#### **1. Install Testing Dependencies**
Ensure you have `@testing-library/react` and other dependencies installed:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jsdom
```

#### **2. Set Up Testing Configuration**
Create a `jest.config.js` file to configure Jest for React:

```javascript
export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Handle CSS imports
  },
};
```

#### **3. Write a Simple React Component Test**
Suppose you have a `Button` component:

**Button.jsx**
```jsx
import React from "react";

export default function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}
```

**Button.test.jsx**
```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders button with label and handles click event", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} label="Click Me" />);

  const button = screen.getByText("Click Me");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

Run the test:

```bash
npm test
```

---

### **Backend Testing with Jest**
To test the Express backend, including Handlebars rendering and API endpoints:

#### **1. Install Jest and Supertest**
```bash
npm install --save-dev jest supertest
```

#### **2. Test an API Endpoint**
Suppose you have an API route to fetch orders:

**orders.js**
```javascript
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json([{ id: 1, name: "Order 1" }]);
});

module.exports = router;
```

**server.js**
```javascript
const express = require("express");
const ordersRouter = require("./routes/orders");

const app = express();
app.use("/api/orders", ordersRouter);

module.exports = app;
```

**server.test.js**
```javascript
const request = require("supertest");
const app = require("./server");

test("GET /api/orders returns a list of orders", async () => {
  const response = await request(app).get("/api/orders");
  expect(response.status).toBe(200);
  expect(response.body).toEqual([{ id: 1, name: "Order 1" }]);
});
```

Run the backend test:

```bash
npm test
```

---

### **Testing Handlebars Templates**
For server-side rendered pages using Handlebars, you can use libraries like **Cheerio** to test the HTML output.

#### **1. Install Cheerio**
```bash
npm install --save-dev cheerio
```

#### **2. Test Handlebars Rendering**
**orders.handlebars**
```html
<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  <h1>{{message}}</h1>
</body>
</html>
```

**server.test.js**
```javascript
const exphbs = require("express-handlebars");
const cheerio = require("cheerio");
const path = require("path");

test("renders the orders page correctly", () => {
  const hbs = exphbs.create({ defaultLayout: null });
  const templatePath = path.join(__dirname, "views/orders.handlebars");

  hbs.renderView(templatePath, { title: "Orders", message: "Order Management" })
    .then((html) => {
      const $ = cheerio.load(html);
      expect($("title").text()).toBe("Orders");
      expect($("h1").text()).toBe("Order Management");
    });
});
```

---

### **Testing MySQL Database Integration**
To test your database queries:

#### **1. Install `mysql2` and Mock MySQL**
```bash
npm install --save-dev mysql2 jest-mysql
```

#### **2. Write Database Query Tests**
**db.js**
```javascript
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "orders_db",
});

module.exports = pool;
```

**db.test.js**
```javascript
const pool = require("./db");

test("fetches orders from the database", async () => {
  const [rows] = await pool.query("SELECT * FROM orders");
  expect(rows).toEqual([{ id: 1, name: "Order 1" }]);
});
```

---

### **Final Steps**
1. **Run All Tests**
   Use a single command to run frontend, backend, and database tests:
   ```bash
   npm test
   ```

2. **Set Up CI/CD for Automated Testing**
   Use GitHub Actions, Travis CI, or similar tools to automate testing for every commit.

3. **Debugging Tips**
   - Use `console.log` or `debug` during tests for troubleshooting.
   - Ensure your database and backend are accessible when running integration tests.

Would you like a detailed guide for setting up a CI/CD pipeline for automated testing? 🚀