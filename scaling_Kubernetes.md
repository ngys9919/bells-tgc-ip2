**Scaling using Kubernetes**
Yes, I would like help with Kubernetes for scaling this deployment, please elaborate.

### **Scaling Your Full-Stack Application Using Kubernetes (K8s)**  

This guide will help you **deploy and scale** your **Vite-React frontend, Express-Handlebars backend, and MySQL database** using **Kubernetes (K8s)** on **DigitalOcean Kubernetes (DOKS)** or any other cloud provider.

---

## **1. Why Use Kubernetes?**
Kubernetes offers:
- **Scalability**: Auto-scale services based on traffic.
- **Self-Healing**: Restarts failed containers automatically.
- **Rolling Updates & Rollbacks**: Deploy new versions with zero downtime.
- **Service Discovery & Load Balancing**: Efficient traffic distribution.

---

## **2. Setup Kubernetes on DigitalOcean**
1. **Install Kubectl** (if not already installed):
   ```bash
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   chmod +x kubectl
   sudo mv kubectl /usr/local/bin/
   ```
   
2. **Create a Kubernetes Cluster** on DigitalOcean:
   ```bash
   doctl kubernetes cluster create my-cluster --region nyc1 --size s-2vcpu-4gb --count 3
   ```

3. **Configure Kubectl to Use the Cluster**:
   ```bash
   doctl kubernetes cluster kubeconfig save my-cluster
   kubectl get nodes
   ```

---

## **3. Define Kubernetes Resources**
We’ll create **YAML manifests** to define Kubernetes objects:  
✅ **Deployments** for managing replicas  
✅ **Services** for networking  
✅ **Persistent Volumes** for MySQL data  

---

### **4. Kubernetes Configuration Files**

#### **Backend Deployment (`backend-deployment.yaml`)**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
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
          image: yourusername/backend:latest
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
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: password
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

#### **Frontend Deployment (`frontend-deployment.yaml`)**
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
          image: yourusername/frontend:latest
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
🔹 This exposes the frontend on a public IP.

---

#### **MySQL Deployment (`mysql-deployment.yaml`)**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
type: Opaque
data:
  password: cGFzc3dvcmQ=  # Base64 encoded "password"

---
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
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: password
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
🔹 Uses a **Persistent Volume Claim (PVC)** to store data.

---

#### **MySQL PVC (`mysql-pvc.yaml`)**
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
      storage: 5Gi
```

---

## **5. Deploy to Kubernetes**
Apply all configurations:
```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-pvc.yaml
```

Verify deployment:
```bash
kubectl get pods
kubectl get services
```

---

## **6. Enable Auto-Scaling**
Kubernetes **Horizontal Pod Autoscaler (HPA)** adjusts pod counts based on CPU usage.

Enable metrics-server:
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Set up auto-scaling for backend:
```bash
kubectl autoscale deployment backend --cpu-percent=50 --min=2 --max=5
```

Check auto-scaler:
```bash
kubectl get hpa
```

---

## **7. CI/CD with GitHub Actions**
Update `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Kubernetes

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Login to Docker Hub
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

      - name: Deploy to Kubernetes
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            kubectl apply -f backend-deployment.yaml
            kubectl apply -f frontend-deployment.yaml
            kubectl apply -f mysql-deployment.yaml
```

---

## **8. Monitoring & Logging**
Monitor cluster:
```bash
kubectl top pods
kubectl logs -f <pod-name>
```

Install **Prometheus & Grafana** for detailed metrics:
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
```

---

## **Next Steps**
✅ **Deploy in Kubernetes**  
✅ **Scale automatically**  
✅ **Enable CI/CD pipeline**  

Would you like to add **Ingress for custom domain routing** or **Kubernetes Secrets for security**? 🚀