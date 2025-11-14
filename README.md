# DevOps Portfolio Project - Auth Service (Kubernetes + GitOps)

Этот репозиторий содержит минимальный продакшен-подобный DevOps-проект для портфолио:

- Микросервис `auth-service` (Node.js, JWT, PostgreSQL)
- Docker
- Helm chart для Kubernetes
- ArgoCD Application (GitOps)
- GitHub Actions (CI: build & push Docker image)

## Стек

- Node.js + Express
- PostgreSQL
- Docker
- Kubernetes + Helm
- ArgoCD
- GitHub Actions
- Docker Hub (как registry)

## Локальный запуск (dev)

1. Перейти в папку сервиса:

```bash
cd services/auth-service
cp .env.example .env
# отредактируй DB_URL и JWT_SECRET при необходимости
```

2. Поднять PostgreSQL (например, через Docker):

```bash
docker run --name auth-postgres \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=authdb \
  -p 5432:5432 \
  -d postgres:16
```

3. Установить зависимости и запустить сервис:

```bash
npm install
npm run dev
```

Сервис будет доступен на `http://localhost:3000`.

## API

- `GET /api/auth/health` — проверка здоровья
- `POST /api/auth/register` — регистрация
  - body: `{ "email": "test@example.com", "password": "secret123" }`
- `POST /api/auth/login` — логин
  - body: `{ "email": "test@example.com", "password": "secret123" }`
- `GET /api/auth/me` — информация о пользователе (нужен заголовок `Authorization: Bearer <token>`)

## CI (GitHub Actions)

Workflow: `.github/workflows/ci-auth-service.yml`

- при каждом `push` в `services/auth-service/**`:
  - устанавливаются зависимости
  - билдится Docker-образ
  - образ пушится в Docker Hub как `DOCKERHUB_USERNAME/auth-service:latest`

Для работы нужно добавить секреты в GitHub (Settings → Secrets and variables → Actions):

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

## CD (ArgoCD + Helm)

- Helm chart: `k8s/helm/auth-service`
- ArgoCD Application: `argocd/auth-service-app.yaml`
  - указывает на этот репозиторий и путь к Helm-чарту
  - разворачивает релиз в namespace `prod`

## Деплой в Kubernetes (кластер + Postgres + ArgoCD)

1. Создать namespace `prod` и поднять Postgres:

```bash
kubectl apply -f k8s/namespaces/prod.yaml
kubectl apply -f k8s/postgres/postgres.yaml
```

2. Создать секрет с параметрами для `auth-service`:

```bash
kubectl create secret generic auth-service-secret   --from-literal=jwtSecret="super-secret-key"   --from-literal=dbUrl="postgresql://user:password@postgres:5432/authdb"   -n prod
```

3. Установить ArgoCD (если ещё не установлен) и применить Application:

```bash
kubectl apply -f argocd/auth-service-app.yaml
```

4. Настроить домен/Ingress (host в `k8s/helm/auth-service/values.yaml`).

После этого:

- ArgoCD будет деплоить `auth-service` в namespace `prod`;
- сервис сможет подключаться к Postgres в `prod` по `postgres:5432`.

## Как использовать этот проект в портфолио

- Добавь описание в профиле Upwork, например:

> Implemented production-like Kubernetes deployment with GitOps (ArgoCD), CI (GitHub Actions), Docker, Helm, and PostgreSQL-backed auth microservice.

- Можешь расширить проект:
  - добавить другие сервисы (`catalog-service`, `order-service`)
  - добавить Prometheus + Grafana
  - добавить Terraform для создания кластера и RDS.
