# CRUD API — RS School Task 3

Implementation of a simple CRUD API without a database, completed as part of the RS School Node.js course.

Task:  
https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments-v2/03-crud-api/assignment.md

Task period: 16.03.2026 — 23.03.2026
Branches:

main — final

develop — development (submitted as PR to main)

📦 Installation
bash
git clone https://github.com/MaryAnzh/CRUD_api_rss_task_3.git
cd CRUD_api_rss_task_3
git checkout develop
npm install

🚀 Available Scripts
Development mode
bash
npm run start:dev
Server: http://localhost:<env.PORT>

Production mode
bash
npm run build

npm run start:prod
<env.PORT>

Multi‑process mode (balancer + workers)
bash
npm run start:multi
<env.PORT+1>
Balancer: http://localhost:3001
Workers: 4001–4004

Tests
bash
npm run build
npm test
Total tests: 11

TypeScript check
bash
npm run compiler

Lint
bash
npm run lint

📌 API Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
POST	/api/products	Create product
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product

Request body (POST/PUT)
json
{
  "name": "Test Product",
  "price": 100,
  "description": "Test description",
  "category": "Test category",
  "inStock": true
}

🧪 Test Overview
1. env.test.ts
Validates environment configuration:

.env is loaded correctly

APP_PORT matches .env

type checks for numeric values

2. products.test.ts
Validates CRUD functionality:

create product

get by ID

get all

update

delete

correct HTTP status codes

3. multiMode.test.ts
Validates multi‑process mode:

balancer and workers start correctly

round‑robin request distribution

correct x-worker-port header

no ERR_HTTP_HEADERS_SENT or ECONNRESET errors

🧪 Manual API Testing
1. Postman / Insomnia (recommended)
Use JSON body for POST/PUT.

2. Browser (GET only)
http://localhost:3000/api/products
http://localhost:3000/api/products/<id>

3. CLI scripts
JSON bodies:

tests/postBody.json

tests/putBody.json

GET all
bash
npm run api:get
GET by ID
bash
npm run api:get:id --id=<productId>
POST
bash
npm run api:post
PUT
bash
npm run api:put --id=<productId>
DELETE
bash
npm run api:delete --id=<productId>
If you want, I can also add:

an Architecture section (Fastify + worker_threads + balancer)

a diagram of request flow

a Configuration section describing all env variables

Just tell me what you'd like to include.