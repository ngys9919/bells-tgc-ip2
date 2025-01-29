**Deployment using DigitalOcean via Droplet**
For the same web project, I would like to deploy by means of hosting in DigitalOcean cloud platform for the full stack of Vite-React frontend, Express and Handlebars backend and MySQL database, how should I do it by giving me illustrated steps with examples?

### **Deploying a Full-Stack Web Application on DigitalOcean**
This guide will walk you through deploying your Vite-React frontend, Express-Handlebars backend, and MySQL database on **DigitalOcean** using a **Droplet (Virtual Machine) and Managed Database**.

---

## **Step 1: Set Up a DigitalOcean Droplet**
A **Droplet** is a virtual private server (VPS) on DigitalOcean.

1. **Log in to DigitalOcean** and go to the [Droplets page](https://cloud.digitalocean.com/droplets).
2. Click **Create → Droplet**.
3. Choose an **Ubuntu 22.04** image.
4. Select a plan (a basic $5/month Droplet is sufficient for small projects).
5. Choose a data center region **closest to your users**.
6. Add **SSH keys** for secure access (or enable password login).
7. Click **Create Droplet**.

After creation, note the **Droplet IP Address**.

---

## **Step 2: Connect to the Droplet via SSH**
Open a terminal and connect:

```sh
ssh root@your-droplet-ip
```

If using a password, enter it when prompted.

---

## **Step 3: Install Node.js and Dependencies**
Once connected to the Droplet:

1. **Update packages**:
   ```sh
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Node.js & npm**:
   ```sh
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. **Verify installation**:
   ```sh
   node -v
   npm -v
   ```

4. **Install Git & PM2 (process manager for Node.js apps)**:
   ```sh
   sudo apt install git -y
   npm install -g pm2
   ```

---

## **Step 4: Clone Your Project & Install Dependencies**
1. **Navigate to a deployment directory**:
   ```sh
   cd /var/www
   ```

2. **Clone your project from GitHub**:
   ```sh
   git clone https://github.com/your-repo/your-project.git
   cd your-project
   ```

3. **Install dependencies**:
   ```sh
   npm install
   ```

---

## **Step 5: Set Up MySQL on DigitalOcean**
### **Option 1: Use DigitalOcean Managed Database (Recommended)**
1. Go to **Databases → Create a Managed Database**.
2. Choose **MySQL** and select a plan.
3. Whitelist your Droplet’s IP address for access.
4. Note the **hostname, username, password, and database name**.

### **Option 2: Install MySQL on Your Droplet**
1. **Install MySQL**:
   ```sh
   sudo apt install mysql-server -y
   ```

2. **Secure MySQL**:
   ```sh
   sudo mysql_secure_installation
   ```

3. **Create a Database & User**:
   ```sh
   sudo mysql -u root -p
   ```

   Inside MySQL:
   ```sql
   CREATE DATABASE orders_db;
   CREATE USER 'youruser'@'%' IDENTIFIED BY 'yourpassword';
   GRANT ALL PRIVILEGES ON orders_db.* TO 'youruser'@'%';
   FLUSH PRIVILEGES;
   EXIT;
   ```

---

## **Step 6: Configure Environment Variables**
1. **Create an `.env` file** in your project:
   ```sh
   nano .env
   ```

2. **Add the following (modify as needed)**:
   ```
   PORT=3000
   DB_HOST=your-database-host
   DB_USER=youruser
   DB_PASSWORD=yourpassword
   DB_NAME=orders_db
   ```

3. **Save the file (Ctrl + X, then Y, then Enter).**

---

## **Step 7: Build & Start the Backend Server**
1. **Start the server using PM2**:
   ```sh
   pm2 start server.js --name "express-backend"
   pm2 save
   pm2 startup
   ```

2. **Check running processes**:
   ```sh
   pm2 list
   ```

---

## **Step 8: Deploy Vite-React Frontend**
1. **Navigate to frontend folder**:
   ```sh
   cd client
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Build the frontend**:
   ```sh
   npm run build
   ```

4. **Serve the frontend using Nginx**:
   - Install Nginx:
     ```sh
     sudo apt install nginx -y
     ```
   - Configure Nginx:
     ```sh
     sudo nano /etc/nginx/sites-available/default
     ```
   - Replace with:
     ```
     server {
         listen 80;
         server_name your-domain.com;

         location / {
             root /var/www/your-project/client/dist;
             index index.html;
             try_files $uri /index.html;
         }

         location /api/ {
             proxy_pass http://localhost:3000/;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }
     ```
   - Save and restart Nginx:
     ```sh
     sudo systemctl restart nginx
     ```

---

## **Step 9: Set Up a Domain Name (Optional)**
1. Purchase a domain from **Namecheap, GoDaddy, etc.**.
2. In **DigitalOcean**, go to **Networking → Domains**.
3. Add a domain and point it to your **Droplet IP**.

---

## **Step 10: Secure the Server with SSL (HTTPS)**
1. Install **Certbot** for SSL:
   ```sh
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. Get an SSL certificate:
   ```sh
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. Verify HTTPS works by visiting `https://your-domain.com`.

---

## **Final Project URL Structure**
| URL | Description |
|------|------------|
| `https://your-domain.com/` | Vite-React frontend |
| `https://your-domain.com/orders` | Handlebars-rendered SSR page |
| `https://your-domain.com/api/orders` | Express API for orders |

---

## **Conclusion**
🎉 You have successfully deployed a full-stack app on **DigitalOcean** with:
- **Vite-React frontend** (served by Nginx)
- **Express-Handlebars backend** (managed by PM2)
- **MySQL database** (DigitalOcean Managed DB or local MySQL)
- **HTTPS secured with Certbot**

Would you like help with anything specific? 🚀