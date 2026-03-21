import { beforeAll, afterAll, describe, expect, test } from "@jest/globals";

import { app } from "../src/index";
import * as C from '../src/constants/index';

import testBody from "./postBody.json";
import { BASE_URL, PRODUCT_NOT_FOUND_ID, UPDATED_PRODUCT } from "./constants";

const PRODUCT_REQUIRED_FIELDS = Object.fromEntries(
    Object.entries(C.START_DATA[0]).map(([key, value]) => [key, typeof value])
);

let createdId = "";

beforeAll(async () => {
    const port = await app.listen({ port: C.APP_PORT });
    console.log(`From test - ${C.SERVER_RUNNING_MASSAGE} ${port}`);
});

afterAll(async () => {
    await app.close();
    console.log('Server close');
});

describe("Scenario 1 — create and get product", () => {
    test("POST /api/products — create product", async () => {
        const response = await fetch(BASE_URL(C.APP_PORT, C.APP_ROUTE), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testBody)
        });

        expect(response.status).toBe(201);

        const body = await response.json();
        expect(body.id).toBeDefined();
        expect(body.name).toBe(testBody.name);

        createdId = body.id;
    });

    test("GET /api/products/:id — get created product", async () => {
        const response = await fetch(
            `http://localhost:${C.APP_PORT}${C.APP_ROUTE}/${createdId}`
        );

        expect(response.status).toBe(200);

        const body = await response.json();

        expect(body.id).toBe(createdId);
        expect(body.price).toBe(testBody.price);
    });
});

describe("Scenario 2 — get all products", () => {
    test("GET /api/products — should return array", async () => {
        const response = await fetch(BASE_URL(C.APP_PORT, C.APP_ROUTE));
        expect(response.status).toBe(200);

        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });
});

describe("Scenario 3 — update product", () => {
    test("PUT /api/products/:id — update created product", async () => {
        const response = await fetch(
            `${BASE_URL(C.APP_PORT, C.APP_ROUTE)}/${createdId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(UPDATED_PRODUCT)
            }
        );

        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body.id).toBe(createdId);
        expect(body.name).toBe(UPDATED_PRODUCT.name);
        expect(body.price).toBe(UPDATED_PRODUCT.price);
    });
});

describe("Scenario 4 — get updated product", () => {
    test("GET /api/products/:id — should return updated product", async () => {
        const response = await fetch(
            `${BASE_URL(C.APP_PORT, C.APP_ROUTE)}/${createdId}`
        );

        expect(response.status).toBe(200);

        const body = await response.json();
        expect(body.name).toBe(UPDATED_PRODUCT.name);
        expect(body.price).toBe(UPDATED_PRODUCT.price);
    });
});

describe("Scenario 5 — validate product structure", () => {
    test("GET /api/products/:id — product has all required fields with correct types", async () => {
        const response = await fetch(
            `${BASE_URL(C.APP_PORT, C.APP_ROUTE)}/${createdId}`
        );

        expect(response.status).toBe(200);

        const body = await response.json();

        for (const key of Object.keys(PRODUCT_REQUIRED_FIELDS)) {
            expect(body).toHaveProperty(key);
        }

        for (const [key, expectedType] of Object.entries(PRODUCT_REQUIRED_FIELDS)) {
            expect(typeof body[key]).toBe(expectedType);
        }
    });
});

describe("Scenario 6 — delete product", () => {
    test("DELETE /api/products/:id — delete created product", async () => {
        const response = await fetch(
            `${BASE_URL(C.APP_PORT, C.APP_ROUTE)}/${createdId}`,
            { method: "DELETE" }
        );

        expect(response.status).toBe(204);
    });
});

describe("Scenario 7 — get deleted product", () => {
    test("GET /api/products/:id — should return 404", async () => {
        const response = await fetch(
            `${BASE_URL(C.APP_PORT, C.APP_ROUTE)}/${createdId}`
        );

        expect(response.status).toBe(404);
    });
});

describe("Scenario 8 — error handling", () => {
    test("GET /api/products/:id — should return error for non-existing product", async () => {
        const response = await fetch(
            `${BASE_URL(C.APP_PORT, C.APP_ROUTE)}/${PRODUCT_NOT_FOUND_ID}`
        );

        expect(response.status).toBe(404);

        const body = await response.json();

        expect(body).toHaveProperty("message");
        expect(typeof body.message).toBe("string");

        expect(body.message.toLowerCase()).toContain("not");
        expect(body.message.toLowerCase()).toContain("found");
    });
});
