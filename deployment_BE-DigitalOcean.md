**Deployment Backend using Digital Ocean**
I would like to deploy the Backend (Express-Handlebars + MySQL) using DigitalOcean (instead of Railway or Heroku), how should I do it by giving me illustrated steps with examples?

### **Deploying Backend (Express-Handlebars + MySQL) on DigitalOcean**  

Since DigitalOcean offers **Droplets (VMs), Managed Databases, and App Platform**, we will use:
- **Droplet (Ubuntu 22.04)** for hosting the backend.
- **Managed MySQL Database** for better scalability.

---

## **1. Set Up a DigitalOcean Droplet**
### **Step 1: Create a Droplet**
1. Log in to [DigitalOcean](https://cloud.digitalocean.com/).
2. Click **"Create"** → **"Droplets"**.
3. Choose **Ubuntu 22.04** as the operating system.
4. Select **Basic Plan** (1 vCPU, 1GB RAM minimum).
5. Choose a **data center region** (closest to users).
6. Set up **SSH keys** (recommended) or **password authentication**.
7. Click **Create Droplet** and note the public IP.

### **Step 2: Connect to the Droplet**
If using SSH:
```bash
ssh root@your-droplet-ip
```

---

## **2. Install Node.js, Git, and PM2**
### **Step 1: Install Node.js & NPM**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
```
Verify installation:
```bash
node -v
npm -v
```

### **Step 2: Install Git & PM2**
```bash
apt install -y git
npm install -g pm2
```

---

## **3. Set Up MySQL on DigitalOcean**
### **Step 1: Create a Managed MySQL Database**
1. Go to **DigitalOcean Dashboard** → **Databases**.
2. Click **Create a Database Cluster** → **MySQL**.
3. Choose the **smallest plan**.
4. Select the **same region as the Droplet**.
5. Click **"Create Database Cluster"**.
6. **Note the database URL** (e.g., `mysql://user:password@host:port/database`).

### **Step 2: Secure Access**
Add the **Droplet's IP** to **Trusted Sources** in the DigitalOcean database settings.

---

## **4. Deploy Backend Application**
### **Step 1: Clone Your Backend Repo**
On the Droplet:
```bash
cd /var/www
git clone https://github.com/your-repo/backend.git
cd backend
```

### **Step 2: Configure Environment Variables**
Create a `.env` file:
```bash
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=orders_db
PORT=5000
```

### **Step 3: Install Dependencies**
```bash
npm install
```

### **Step 4: Start the Server with PM2**
```bash
pm2 start index.js --name backend
pm2 save
pm2 startup
```

---

## **5. Set Up Reverse Proxy (NGINX)**
### **Step 1: Install NGINX**
```bash
apt install -y nginx
```

### **Step 2: Configure NGINX**
Edit the config:
```bash
nano /etc/nginx/sites-available/backend
```
Add:
```nginx
server {
    listen 80;
    server_name your-domain-or-ip;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
Enable the config:
```bash
ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## **6. Test Deployment**
Visit:  
👉 **`http://your-droplet-ip`**  
or  
👉 **`http://your-domain.com`** (if using a domain).  

Test the API:
```bash
curl http://your-droplet-ip/api/orders
```

---

## **7. Connect Netlify Frontend to DigitalOcean Backend**
In **Netlify settings**, update:
```
VITE_BACKEND_URL=http://your-droplet-ip
```

---

### **Final Steps**
✅ **Backend deployed on DigitalOcean Droplet**  
✅ **MySQL hosted on DigitalOcean Managed Database**  
✅ **Frontend connected to DigitalOcean Backend**  

Would you like to **automate deployment with CI/CD**? 🚀