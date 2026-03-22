import { beforeAll, afterAll, describe, expect, test } from "@jest/globals";
import { spawn } from "child_process";
import os from "os";
import treeKill from "tree-kill";
import path from "path";

import { BASE_URL } from "./constants";
import * as C from "../src/constants/index";

let multiProcess: ReturnType<typeof spawn>;
const WORKERS_COUNT = os.cpus().length;

const EXPECTED_ORDER = Array.from({ length: WORKERS_COUNT + 1 }, (_, i) =>
    C.FIRST_WORKER_PORT + (i % WORKERS_COUNT)
);

beforeAll(async () => {
    jest.setTimeout(15000);

    await new Promise<void>((resolve, reject) => {
        const threadsPath = path.resolve("dist/threads.js");

        multiProcess = spawn(process.execPath, [threadsPath], {
            stdio: ["pipe", "pipe", "pipe"]
        });

        let readyWorkers = 0;
        let balancerReady = false;

        multiProcess.stdout?.on("data", (data) => {
            const text = data.toString();

            if (text.includes("Balancer on")) {
                console.log(text);
                balancerReady = true;
            }

            if (text.includes("Worker") && text.includes("started on")) {
                readyWorkers++;
            }

            if (balancerReady && readyWorkers === WORKERS_COUNT) {
                resolve();
            }
        });

        multiProcess.stderr?.on("data", (data) => {
            console.log("ERR:", data.toString());
        });

        multiProcess.on("error", reject);
    });
});

afterAll(async () => {
    if (multiProcess) {
        treeKill(multiProcess.pid ?? 0);
    }
});

describe("Multi-mode — round-robin load balancing", () => {
    test("Requests should go to ports in round-robin order", async () => {
        const results: number[] = [];

        for (let i = 0; i < WORKERS_COUNT + 1; i++) {
            const res = await fetch(BASE_URL(C.APP_PORT_TEST, C.APP_ROUTE)); // 3001
            const workerPort = res.headers.get("x-worker-port");

            expect(workerPort).not.toBeNull();
            results.push(Number(workerPort));
        }

        console.log(`Round: ${results}`);
        expect(results).toEqual(EXPECTED_ORDER);
    });
});