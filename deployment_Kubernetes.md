**Deployment using Kubernetes with Docker Desktop**
For the same web project, I would like to deploy by means of Kubernetes with Docker Desktop platform for the full stack of Vite-React frontend, Express and Handlebars backend and MySQL database, how should I do it by giving me illustrated steps with examples?

### **Deploying Your Full-Stack Web Application on Kubernetes with Docker Desktop**  

This guide will help you deploy your **Vite-React frontend, Express-Handlebars backend, and MySQL database** using **Kubernetes (K8s) with Docker Desktop**.

---

## **1. Enable Kubernetes in Docker Desktop**
1. Open **Docker Desktop**.
2. Go to **Settings** → **Kubernetes**.
3. Check **"Enable Kubernetes"** and click **"Apply & Restart"**.
4. Verify Kubernetes is running:
   ```bash
   kubectl get nodes
   ```

---

## **2. Prepare Docker Images**
We need to build and push **Docker images** for the frontend and backend.

### **Step 1: Build & Tag Images**
Navigate to your project root and build the images:

#### **Backend**
```bash
docker build -t myapp-backend:latest ./backend
```
#### **Frontend**
```bash
docker build -t myapp-frontend:latest ./client
```
#### **Verify Images**
```bash
docker images
```

---

## **3. Define Kubernetes YAML Files**
We will create the necessary **YAML manifests**.

### **Step 1: Backend Deployment (`backend-deployment.yaml`)**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: myapp-backend:latest
          ports:
            - containerPort: 5000
          env:
            - name: NODE_ENV
              value: "production"
            - name: DB_HOST
              value: "mysql"
            - name: DB_USER
              value: "root"
            - name: DB_PASSWORD
              value: "password"
            - name: DB_NAME
              value: "orders_db"
---
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
  type: ClusterIP
```

---

### **Step 2: Frontend Deployment (`frontend-deployment.yaml`)**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: myapp-frontend:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```
🔹 This exposes the frontend on a public port.

---

### **Step 3: MySQL Deployment (`mysql-deployment.yaml`)**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:latest
          env:
            - name: MYSQL_ROOT_PASSWORD
              value: "password"
            - name: MYSQL_DATABASE
              value: "orders_db"
          ports:
            - containerPort: 3306
          volumeMounts:
            - name: mysql-data
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-data
          persistentVolumeClaim:
            claimName: mysql-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  selector:
    app: mysql
  ports:
    - protocol: TCP
      port: 3306
      targetPort: 3306
```

---

### **Step 4: Persistent Volume for MySQL (`mysql-pvc.yaml`)**
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

---

## **4. Apply Kubernetes Configurations**
1. Apply the MySQL configuration:
   ```bash
   kubectl apply -f mysql-deployment.yaml
   kubectl apply -f mysql-pvc.yaml
   ```
2. Deploy the backend:
   ```bash
   kubectl apply -f backend-deployment.yaml
   ```
3. Deploy the frontend:
   ```bash
   kubectl apply -f frontend-deployment.yaml
   ```

4. Verify all services are running:
   ```bash
   kubectl get pods
   kubectl get services
   ```

---

## **5. Enable Port Forwarding**
To access the services locally, forward ports:

#### **Backend**
```bash
kubectl port-forward svc/backend 5000:5000
```
#### **Frontend**
```bash
kubectl port-forward svc/frontend 3000:80
```

Now, open:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

---

## **6. Auto-Scaling with Kubernetes**
Enable **Horizontal Pod Autoscaler (HPA)**:

1. Install the **metrics server**:
   ```bash
   kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
   ```
2. Enable auto-scaling for the backend:
   ```bash
   kubectl autoscale deployment backend --cpu-percent=50 --min=2 --max=5
   ```
3. Check the **HPA**:
   ```bash
   kubectl get hpa
   ```

---

## **7. Cleanup**
To delete everything:
```bash
kubectl delete -f frontend-deployment.yaml
kubectl delete -f backend-deployment.yaml
kubectl delete -f mysql-deployment.yaml
kubectl delete -f mysql-pvc.yaml
```

---

## **Next Steps**
✅ **Deploy Kubernetes on Docker Desktop**  
✅ **Expose services**  
✅ **Enable auto-scaling**  

Would you like to add **Ingress for domain routing** or **CI/CD automation**? 🚀
