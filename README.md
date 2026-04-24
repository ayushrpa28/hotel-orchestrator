HOTEL ORCHESTRATOR (Temporal + Node.js + Redis)

----------------------------------------

DESCRIPTION
A backend system that fetches hotel data from multiple suppliers using Temporal workflows.
It combines results, removes duplicates, compares prices, and returns the best data via an API.

----------------------------------------

TECH STACK

- Node.js
- Express.js
- Temporal (workflow orchestration)
- Redis (caching)
- Docker & Docker Compose
- TypeScript

----------------------------------------

PROJECT STRUCTURE

src/
  routes/
    hotelRoutes.ts
  workflows/
    hotelWorkflow.ts
  activities/
    hotelActivities.ts
  suppliers/
    supplierA.ts
    supplierB.ts
  redis/
    client.ts
  types/
    hotel.ts
  worker.ts
  app.ts
  server.ts

----------------------------------------

PREREQUISITES

- Docker installed
- Node.js (only if running locally without Docker)

----------------------------------------

SETUP & RUN (DOCKER)

1. Clone the project

git clone https://github.com/ayushrpa28/hotel-orchestrator
cd hotel-orchestrator

2. Start all services

docker-compose up --build

3. Wait for services to start:
- app (API)
- worker
- temporal
- temporal-ui
- redis
- postgres

----------------------------------------

ACCESS SERVICES

API:
http://localhost:3000

Temporal UI:
http://localhost:8233

----------------------------------------

API ENDPOINTS

1. Get Hotels

GET /api/hotels?city=delhi

2. With filters

GET /api/hotels?city=delhi&minPrice=5000&maxPrice=7000

3. Health Check

GET /api/health

----------------------------------------

HOW IT WORKS

1. API receives request
2. Starts Temporal workflow
3. Worker executes activities (supplier calls)
4. Data is fetched in parallel
5. Results are merged and deduplicated
6. Lowest price per hotel is selected
7. Data is cached in Redis
8. Response is returned

----------------------------------------

DEPLOYMENT STEPS

1. Build containers

docker-compose build

2. Start services

docker-compose up -d

3. Check running containers

docker ps

4. View logs

docker-compose logs -f

----------------------------------------

STOP SERVICES

docker-compose down

----------------------------------------

FUTURE IMPROVEMENTS

- Retry and timeout handling
- Circuit breaker for suppliers
- Sorting and pagination
- Cloud deployment (AWS / Kubernetes)

----------------------------------------

AUTHOR

Ayush Sinha

----------------------------------------
