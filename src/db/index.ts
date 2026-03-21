import type { Product } from "../types";
import { v4 as uuidV4 } from "uuid";
import * as C from "../constants";

export class ProductsRepository {
    #products: Product[];

    constructor(products: Product[]) {
        this.#products = products;
    }

    getAll(): Product[] {
        console.log("Getting all products work");
        return this.#products;
    }

    getById(id: string): Product | undefined {
        return this.#products.find((p) => p.id === id);
    }

    create(data: Omit<Product, "id">): Product {
        const newProduct: Product = {
            id: uuidV4(),
            ...data
        };

        this.#products.push(newProduct);
        return newProduct;
    }

    update(id: string, data: Partial<Omit<Product, "id">>): Product | undefined {
        const index = this.#products.findIndex((p) => p.id === id);
        if (index === -1) return undefined;

        this.#products[index] = {
            ...this.#products[index],
            ...data
        };

        return this.#products[index];
    }

    delete(id: string): boolean {
        const index = this.#products.findIndex((p) => p.id === id);
        if (index === -1) return false;

        this.#products.splice(index, 1);
        return true;
    }
}

export const productsRepository = new ProductsRepository(C.START_DATA);