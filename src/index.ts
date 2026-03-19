import Fastify from "fastify";
import { productsRoutes } from "~routes";
import * as C from "~constants";

import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT) || C.APP_PORT_TEST;

export const app = Fastify({
    logger: true
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

if (process.env.JEST_WORKER_ID === undefined) {
    app.listen({ port }).then(() => {
        console.log(`${C.SERVER_RUNNING_MASSAGE} ${port}`);
    });
}