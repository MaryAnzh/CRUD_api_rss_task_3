import Fastify from "fastify";
import { productsRoutes } from "./routes/index";
import * as C from "./constants/index";
import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT) ?? C.APP_PORT; // 3000

export const app = Fastify({
    logger: !process.env.WORKER_MODE
});

if (process.env.NODE_ENV !== "production") {
    app.addHook("onSend", async (_req, _reply, payload: string) => {
        try {
            return JSON.stringify(JSON.parse(payload), null, 2);
        } catch {
            return payload;
        }
    });
}

app.register(productsRoutes, { prefix: C.APP_ROUTE });

if (!process.env.WORKER_MODE && !process.env.JEST_WORKER_ID) {
    app.listen({ port }).then(() => {
        console.log(`mode: ${process.env.NODE_ENV}`);
        console.log(`${C.SERVER_RUNNING_MASSAGE} ${port}`);
    });
}