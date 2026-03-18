# CRUD API — RS School Task 3

This project is an implementation of a simple CRUD API without a database, completed as part of the RS School Node.js course.

**Task link:**  
https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments-v2/03-crud-api/assignment.md

**Task period:** 16.03.2026 — 23.03.2026  
**Main branch:** `main`  
**Development branch:** `develop`  
The final solution is submitted as a PR from `develop` to `main`.

---

## 🚀 Installation & Running the Server

```bash
git clone https://github.com/MaryAnzh/CRUD_api_rss_task_3.git
cd CRUD_api_rss_task_3
git checkout develop
npm install
npm run start:dev
The server will start at:
http://localhost:3000

📌 Available Endpoints
GET: /api/products -- Get all products
GET: /api/products/:id -- Get product by ID
POST: /api/products -- Create a new product
PUT: /api/products/:id -- Update product by ID
DELETE: /api/products/:id -- Delete product by ID

body: {
  "name": "Test Product",
  "price": 100,
  "description": "Test description",
  "category": "Test category",
  "inStock": true
}


🧪 How to Test the API
You can test the API using three different methods.

1. 🟦 Postman / Insomnia (recommended)
This is the easiest way:

for POST/PUT, provide a JSON body


2. 🌐 Browser (GET only)
Browsers can only send GET requests, so only these endpoints work:

http://localhost:3000/api/products
http://localhost:3000/api/products/<productId>
POST, PUT, and DELETE cannot be tested in a browser.

3. 🟩 Using npm scripts (Windows PowerShell, macOS, Linux)
The project includes convenient npm scripts for testing all CRUD operations.

JSON bodies for POST and PUT are stored in:
tests/postBody.json
tests/putBody.json

✔ GET — all products
bash
npm run api:get

✔ GET — by ID
bash
npm run api:get:id --id=<productId>

Example:
npm run api:get:id --id=124_example

✔ POST — create a product
bash
npm run api:post
The request body is taken from:
tests/postBody.json

✔ PUT — update a product
bash
npm run api:put --id=<productId>

Example:
npm run api:put --id=124_example
The request body is taken from:
tests/putBody.json

✔ DELETE — remove a product
bash
npm run api:delete --id=<productId>

Example:
npm run api:delete --id=124_example
npm run api:put --id=123_example
