
# Cloud-Native Auth Service 🚀  
**Production-grade DevOps project with Kubernetes, GitOps, CI/CD, and Docker**

This repository contains a **realistic, production-style microservice setup** designed to showcase professional DevOps skills.  


The project includes:

- **Node.js Authentication Microservice**
- **PostgreSQL Database**
- **Dockerized Runtime**
- **Kubernetes Deployment via Helm**
- **GitOps continuous delivery with ArgoCD**
- **CI pipeline with GitHub Actions**

Perfect for demonstrating skills in containerization, CI/CD, cloud-native architecture, GitOps workflows, and K8s automation.

---

## 🧩 Architecture Overview

```
                GitHub Repo
                     │
             GitHub Actions (CI)
         Build → Scan → Push Docker image
                     │
                     ▼
             Docker Hub Registry
                     │
                     ▼
        ┌──────────────────────────┐
        │        ArgoCD (CD)       │
        │ GitOps sync from Git repo│
        └──────────────────────────┘
                     │
                     ▼
          Kubernetes Cluster (prod)
        ┌──────────────────────────┐
        │  auth-service (Node.js)  │
        │  Postgres (Stateful)     │
        │  Ingress (Nginx)         │
        └──────────────────────────┘
```

The cluster fully auto-syncs on code changes using ArgoCD.

---

## 🚀 Features

### 🔐 Auth Microservice
- Register/Login
- JWT authentication
- Hashed passwords (bcrypt)
- Secure environment variable injection
- PostgreSQL persistence

### ☸ Kubernetes & Helm
- Production-grade Deployment & Service
- Ingress with Nginx
- Dynamic environment variables via Secrets
- Scalable replica configuration

### 🔄 GitOps with ArgoCD
- Automatic deployment from Git
- Self-healing & drift detection
- Versioned infrastructure

### ⚙ CI/CD on GitHub Actions
- Build Docker image
- Push to Docker Hub
- Automatic deployment via ArgoCD

---

## 📦 Tech Stack

**Backend:** Node.js, Express  
**Database:** PostgreSQL  
**Containerization:** Docker  
**Orchestration:** Kubernetes  
**Deployment:** Helm + ArgoCD  
**CI Pipeline:** GitHub Actions  
**Registry:** Docker Hub  
**Ingress:** Nginx  

---

## 🛠 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cloud-native-auth-service.git
cd cloud-native-auth-service/services/auth-service
```

### 2. Configure environment
```bash
cp .env.example .env
```

### 3. Start PostgreSQL locally
```bash
docker run --name auth-postgres   -e POSTGRES_USER=user   -e POSTGRES_PASSWORD=password   -e POSTGRES_DB=authdb   -p 5432:5432   -d postgres:16
```

### 4. Run service
```bash
npm install
npm run dev
```

API available at:
```
http://localhost:3000/api/auth
```

---

## 🌐 API Endpoints

| Method | Endpoint            | Description            |
|--------|----------------------|------------------------|
| GET    | `/health`           | Service health check   |
| POST   | `/register`         | Create user            |
| POST   | `/login`            | Authenticate user      |
| GET    | `/me`               | Get current user       |

Authorization:
```
Authorization: Bearer <token>
```

---

## ☸ Kubernetes Deployment

### 1. Create namespace
```bash
kubectl apply -f k8s/namespaces/prod.yaml
```

### 2. Deploy PostgreSQL
```bash
kubectl apply -f k8s/postgres/postgres.yaml
```

### 3. Create Secrets
```bash
kubectl create secret generic auth-service-secret   --from-literal=jwtSecret="super-secret-key"   --from-literal=dbUrl="postgresql://user:password@postgres:5432/authdb"   -n prod
```

### 4. Deploy via ArgoCD
```bash
kubectl apply -f argocd/auth-service-app.yaml
```

ArgoCD will automatically deploy & keep the cluster in sync with Git.

---

## 🔧 CI/CD Pipeline (GitHub Actions)

Located at:
```
.github/workflows/ci-auth-service.yml
```

Pipeline steps:
1. Checkout repository  
2. Install dependencies  
3. Build Docker image  
4. Push to Docker Hub  
5. ArgoCD pulls new version automatically  

Add these GitHub secrets:

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Docker Hub login |
| `DOCKERHUB_TOKEN`    | Docker Hub access token |



