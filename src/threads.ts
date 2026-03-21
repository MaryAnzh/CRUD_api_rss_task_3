import { Worker, isMainThread, workerData } from "worker_threads";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import http from "http";
import dotenv from "dotenv";
import os from "os";
import * as C from "./constants/index";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Определяем, как был запущен файл
const isDirectRun = process.argv[1]?.includes("threads.js");
const isJest = !!process.env.JEST_WORKER_ID;

// ❗ Если Jest импортирует threads.js через index.js — НЕ запускать балансировщик
if (isJest && !isDirectRun) {
    console.log("threads.ts: skipped (imported by Jest)");
} else {
    const MAIN_PORT = C.APP_PORT_TEST; // 3001
    const WORKERS_COUNT = os.cpus().length;
    const FIRST_WORKER_PORT = C.FIRST_WORKER_PORT;

    console.log(`mode: ${process.env.NODE_ENV}`);
    console.log(`WORKERS_COUNT: ${WORKERS_COUNT}`);

    if (isMainThread) {
        const ports = Array.from(
            { length: WORKERS_COUNT },
            (_, i) => FIRST_WORKER_PORT + i
        );

        const workerPath = join(__dirname, "threads.js");

        ports.forEach((port) => {
            new Worker(workerPath, { workerData: { port } });
        });

        let current = 0;

        const server = http.createServer((req, res) => {
            const targetPort = ports[current];
            current = (current + 1) % ports.length;

            const proxyReq = http.request(
                {
                    hostname: "127.0.0.1",
                    port: targetPort,
                    path: req.url,
                    method: req.method,
                    headers: req.headers
                },
                (proxyRes) => {
                    // Добавляем заголовок здесь, а не в воркере
                    res.setHeader("x-worker-port", targetPort);

                    // Проксируем заголовки и статус
                    res.writeHead(proxyRes.statusCode ?? 500, proxyRes.headers);

                    // Проксируем тело ответа
                    proxyRes.pipe(res);
                }
            );

            req.pipe(proxyReq);
        });

        server.listen(MAIN_PORT, () => {
            console.log(
                `Balancer on http://127.0.0.1:${MAIN_PORT}, workers on ${ports.join(", ")}`
            );
        });
    } else {
        process.env.WORKER_MODE = "1";

        import("./index.js").then(({ app }) => {
            const port = workerData.port;

            // ❗ Удалили onSend — он ломал заголовки
            // Fastify отвечает как обычно

            app.listen({ port }).then(() => {
                console.log(`Worker ${process.pid} started on http://127.0.0.1:${port}`);
            });
        });
    }
}