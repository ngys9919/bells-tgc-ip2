**Deployment Backend using Heroku**
I would like to deploy the Backend (Express-Handlebars + MySQL) using Heroku (instead of Railway), how should I do it by giving me illustrated steps with examples?

### **Deploying Backend (Express-Handlebars + MySQL) on Heroku**  

Since Heroku does not provide a MySQL database natively, we will use **JawsDB MySQL** (a cloud-hosted MySQL add-on).  

---

## **1. Install Heroku CLI**
First, install the **Heroku CLI**:
- **Windows:** [Download Here](https://devcenter.heroku.com/articles/heroku-cli)
- **Mac/Linux:**  
  ```bash
  curl https://cli-assets.heroku.com/install.sh | sh
  ```
- **Verify Installation:**  
  ```bash
  heroku --version
  ```

---

## **2. Log In to Heroku**
```bash
heroku login
```

---

## **3. Create a New Heroku App**
Navigate to your **backend project** directory:
```bash
cd backend
heroku create my-backend-app
```
🔹 Replace `my-backend-app` with your own app name.

---

## **4. Add MySQL Database (JawsDB)**
```bash
heroku addons:create jawsdb:kitefin
```
🔹 This will create a **MySQL database** and provide a **connection URL**.

To check the database URL:
```bash
heroku config
```
It will return something like:
```bash
JAWSDB_URL=mysql://user:password@host:port/database
```

---

## **5. Configure Environment Variables**
Set up environment variables on Heroku:
```bash
heroku config:set NODE_ENV=production
heroku config:set DB_URL=$(heroku config:get JAWSDB_URL)
```
Then, in your **Express app**, update the database connection:
```js
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DB_URL);
```

---

## **6. Deploy Backend to Heroku**
### **Step 1: Initialize Git (if not already done)**
```bash
git init
git add .
git commit -m "Initial Heroku deployment"
```

### **Step 2: Deploy to Heroku**
```bash
git push heroku main
```

### **Step 3: Scale the Application**
```bash
heroku ps:scale web=1
```

---

## **7. Test Your Deployment**
Check if the backend is running:
```bash
heroku open
```
Or manually test the API:
```bash
curl https://my-backend-app.herokuapp.com/api/orders
```

---

## **8. Connect Netlify Frontend to Heroku Backend**
In **Netlify settings**, update the backend URL:
```
VITE_BACKEND_URL=https://my-backend-app.herokuapp.com
```

---

### **Final Steps**
✅ **Backend deployed on Heroku**  
✅ **MySQL hosted on JawsDB**  
✅ **Frontend connected to Heroku Backend**  

Would you like to add **CI/CD for automatic deployments**? 🚀