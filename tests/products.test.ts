import { beforeAll, afterAll, describe, expect, test } from "@jest/globals";

import { app } from "../src/index";
import * as C from '~constants';

import testBody from "./postBody.json";
let createdId = "";

beforeAll(async () => {
    const port = await app.listen({ port: C.APP_PORT_TEST });
    console.log(`${C.SERVER_RUNNING_MASSAGE} ${port}`);
});

afterAll(async () => {
    await app.close();
    console.log('Server close');
});

describe("Scenario 1 — create and get product", () => {
    test("POST /api/products — create product", async () => {
        const response = await fetch(`http://localhost:${C.APP_PORT_TEST}${C.APP_ROUTE}`, {
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
            `http://localhost:${C.APP_PORT_TEST}${C.APP_ROUTE}/${createdId}`
        );

        expect(response.status).toBe(200);

        const body = await response.json();

        expect(body.id).toBe(createdId);
        expect(body.price).toBe(testBody.price);
    });
});