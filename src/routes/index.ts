import type { FastifyInstance } from "fastify";

import * as C from "../controllers";

export async function productsRoutes(app: FastifyInstance) {
    app.get("/", C.getAllProducts);
    app.get("/:id", C.getProductById);
    app.post("/", C.createProduct);
    app.put("/:id", C.updateProduct);
    app.delete("/:id", C.deleteProduct);
}