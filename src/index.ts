import Fastify from "fastify";
import { productsRoutes } from "~routes";

import dotenv from "dotenv";
dotenv.config();
// if .env  work - 3000 (code get from .env, not fom env.example), if doesn't - 3001
const port = Number(process.env.PORT) || 3001;

const app = Fastify({
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

app.register(productsRoutes, { prefix: "/api/products" });

app.listen({ port }).then(() => {
    console.log(`Server running on port ${port}`);
});