**Deployment using Docker Container**
For the same web project, I would like to deploy by means of dockerization via docker containers in Docker Registry platform for the full stack of Vite-React frontend, Express and Handlebars backend and MySQL database, how should I do it by giving me illustrated steps with examples?

### **Deploying Your Full-Stack Web Application via Docker Containers**

This guide will help you deploy your **Vite-React frontend, Express-Handlebars backend, and MySQL database** using **Docker containers** and push the images to **Docker Hub (Docker Registry)**.

---

## **1. Prepare Your Project for Dockerization**

### **Project Structure**
Ensure your project has a structure similar to the following:

```
project-root/
├── backend/
│   ├── server.js          # Express server
│   ├── Dockerfile         # Backend Dockerfile
├── client/
│   ├── src/
│   ├── Dockerfile         # Frontend Dockerfile
│   ├── vite.config.js
├── docker-compose.yml     # Compose file for multi-container setup
├── .dockerignore          # Ignore unnecessary files for Docker builds
└── .env                   # Environment variables
```

---

## **2. Dockerize Each Service**

### **Step 1: Backend Dockerfile**

Create a `Dockerfile` in the `backend/` directory:

```dockerfile
# Backend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the server port
EXPOSE 5000

# Run the server
CMD ["npm", "start"]
```

---

### **Step 2: Frontend Dockerfile**

Create a `Dockerfile` in the `client/` directory:

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code and build the app
COPY . .
RUN npm run build

# Serve the build using a lightweight server
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default port for NGINX
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

### **Step 3: Create a `docker-compose.yml`**

Define multi-container services in the root `docker-compose.yml` file:

```yaml
version: "3.8"

services:
  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DB_HOST=mysql
      - DB_USER=root
      - DB_PASSWORD=yourpassword
      - DB_NAME=orders_db
    depends_on:
      - mysql

  frontend:
    build:
      context: ./client
    ports:
      - "3000:80"

  mysql:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: yourpassword
      MYSQL_DATABASE: orders_db
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

---

### **Step 4: Create a `.dockerignore` File**

In the root, create a `.dockerignore` file to exclude unnecessary files:

```plaintext
node_modules
dist
Dockerfile
.dockerignore
.env
```

---

## **3. Build and Test Docker Containers Locally**

1. **Build and Start Services**:
   ```bash
   docker-compose up --build
   ```

2. **Verify Services**:
   - **Frontend**: Access `http://localhost:3000`.
   - **Backend**: Test APIs at `http://localhost:5000`.

3. **Stop Services**:
   ```bash
   docker-compose down
   ```

---

## **4. Push Images to Docker Registry**

### **Step 1: Log in to Docker Hub**
```bash
docker login
```

### **Step 2: Tag and Push Images**
1. **Backend**:
   ```bash
   docker build -t yourusername/backend:1.0 ./backend
   docker push yourusername/backend:1.0
   ```

2. **Frontend**:
   ```bash
   docker build -t yourusername/frontend:1.0 ./client
   docker push yourusername/frontend:1.0
   ```

3. **MySQL**:
   Use the official `mysql:latest` image—no need to push custom versions.

---

## **5. Deploy Containers on a Server**

### **Step 1: Provision a Server**
Use DigitalOcean or any other provider to create a server with **Docker** and **Docker Compose** installed.

### **Step 2: Copy `docker-compose.yml` to the Server**
Use **scp** to transfer the `docker-compose.yml` file:
```bash
scp docker-compose.yml root@your-server-ip:/path/to/project
```

### **Step 3: Pull Images and Start Services**
On the server, pull images and start the application:
```bash
docker-compose pull
docker-compose up -d
```

---

## **6. Continuous Deployment with GitHub Actions**

Automate deployments with GitHub Actions:

1. **Create a `.github/workflows/deploy.yml`**:

```yaml
name: Deploy to Docker

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push Backend
        run: |
          docker build -t yourusername/backend:latest ./backend
          docker push yourusername/backend:latest

      - name: Build and Push Frontend
        run: |
          docker build -t yourusername/frontend:latest ./client
          docker push yourusername/frontend:latest

      - name: SSH to Server and Deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /path/to/project
            docker-compose pull
            docker-compose up -d
```

2. **Add GitHub Secrets**:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `SERVER_IP`
   - `SSH_PRIVATE_KEY`

---

## **7. Verify Deployment**
- Access the frontend: `http://<your-server-ip>:3000`.
- Test backend APIs: `http://<your-server-ip>:5000`.

---

### Would you like help with Docker Swarm or Kubernetes for scaling this deployment?
