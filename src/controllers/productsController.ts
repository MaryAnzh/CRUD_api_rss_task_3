import type { FastifyReply, FastifyRequest } from "fastify";
import type { Product } from "../types/index";

import * as C from "../constants/index";

import { productsRepository as R } from "../db/index";


export const getAllProducts = async (_req: FastifyRequest, reply: FastifyReply) => {
    const products = R.getAll();
    reply.send(products);
};

export const getProductById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const product = R.getById(req.params.id);
    if (!product) {
        return reply.status(404).send({ message: C.PRODUCT_NOT_FOUND });
    }
    reply.send(product);
};

export const createProduct = async (req: FastifyRequest<{ Body: Omit<Product, "id"> }>, reply: FastifyReply) => {
    const newProduct = R.create(req.body);
    reply.status(201).send(newProduct);
};

export const updateProduct = async (
    req: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<Product, "id">> }>,
    reply: FastifyReply
) => {
    const updated = R.update(req.params.id, req.body);
    if (!updated) {
        return reply.status(404).send({ message: C.PRODUCT_NOT_FOUND });
    }
    reply.send(updated);
};

export const deleteProduct = (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const ok = R.delete(req.params.id);
    if (!ok) {
        return reply.status(404).send({ message: C.PRODUCT_NOT_FOUND });
    }
    reply.status(204).send();
};
