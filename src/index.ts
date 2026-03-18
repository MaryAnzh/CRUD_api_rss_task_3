import Fastify from "fastify";
import { productsRoutes } from "~routes";

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

app.listen({ port: 3000 }).then(() => {
    console.log("Server running on port 3000");
});