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
{"level":30,"time":1774182689326,"pid":19256,"hostname":"Ampos","msg":"Server listening at http://127.0.0.1:3000"}
3000 => <env.PORT> in my env

Production mode
bash
npm run build

npm run start:prod
<env.PORT>

Multi‑process mode (balancer + workers)
bash
npm run start:multi
<env.PORT>
Balancer: http://localhost:3000
Workers: 4001–4004

Tests
bash
npm run build
npm test
Total tests: 11 (in 3 files)

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

🧪 Test Overview (Jest)
1. env.test.ts
Validates environment configuration:

.env is loaded correctly

APP_PORT matches .env

type checks for numeric values

2. products.test.ts
Validates CRUD functionality:

- Scenario 1 — create and get product
- Scenario 2 — get all products
- Scenario 3 — update product
- Scenario 4 — get updated product
- Scenario 5 — validate product structure
- Scenario 6 — delete product
- Scenario 7 — get deleted product
- Scenario 8 — error handling

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

npm run start:dev (on port 3000)
open one more bash

GET all
bash
npm run api:get

PS D:\***\Node_js\CRUD_api_rss_task_3> npm run api:get

> crud_api_rss_task_3@1.0.0 api:get
> curl http://localhost:3000/api/products

[  {
    "id": "123_example",
    "name": "Product 1",
    "description": "Description for product 1",
    "price": 10.99,
    "category": "Category A",
    "inStock": true
  },
  {
    "id": "124_example",
    "name": "Product 1",
    "description": "Description for product 1",
    "price": 10.99,
    "category": "Category A",
    "inStock": true
  }

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
