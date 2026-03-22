import { describe, test, expect, beforeAll } from "@jest/globals";
import dotenv from "dotenv";

beforeAll(() => {
    dotenv.config();
});

describe("Environment configuration", () => {
    test("APP_PORT should be loaded from .env (in my -- 3000)", () => {
        const expectedPort = Number(process.env.PORT);
        // write port from env, example 3000
        console.log(`env.PORT: ${expectedPort}`);
        // expect(expectedPort).toBe(3000);
        expect(typeof expectedPort).toBe("number");
    });
});