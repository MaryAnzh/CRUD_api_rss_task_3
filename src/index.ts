import Fastify from "fastify";

const app = Fastify();

app.get("/", async () => {
    return { status: "ok" };
});

app.listen({ port: 3000 }).then(() => {
    console.log("Server running on port 3000");
});