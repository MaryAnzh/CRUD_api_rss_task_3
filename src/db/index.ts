import type { Product } from "../types";
import { v4 as uuidV4 } from "uuid";
import * as C from "../constants";
import type { CreateProductKeysType } from "../types";

const ALLOWED_FIELDS: CreateProductKeysType[] = ["name", "price", "description", "category", "inStock"] as const;

export class ProductsRepository {
    #products: Product[];

    constructor(products: Product[]) {
        this.#products = products;
    }

    validateCreate(data: Omit<Product, "id">) {
        for (const field of ALLOWED_FIELDS) {
            if (!(field in data)) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        this.validateTypes(data);
    }

    validateUpdate(data: Partial<Omit<Product, "id">>) {
        for (const key of Object.keys(data)) {
            if (!ALLOWED_FIELDS.includes(key as CreateProductKeysType)) {
                throw new Error(`Unknown field: ${key}`);
            }
        }

        this.validateTypes(data);
    }

    validateTypes(data: any) {
        if ("name" in data && typeof data.name !== "string") {
            throw new Error("Field 'name' must be a string");
        }

        if ("price" in data && typeof data.price !== "number") {
            throw new Error("Field 'price' must be a number");
        }

        if ("description" in data && typeof data.description !== "string") {
            throw new Error("Field 'description' must be a string");
        }

        if ("category" in data && typeof data.category !== "string") {
            throw new Error("Field 'category' must be a string");
        }

        if ("inStock" in data && typeof data.inStock !== "boolean") {
            throw new Error("Field 'inStock' must be a boolean");
        }
    }

    getAll(): Product[] {
        console.log("Getting all products work");
        return this.#products;
    }

    getById(id: string): Product | undefined {
        return this.#products.find((p) => p.id === id);
    }

    create(data: Omit<Product, "id">): Product {
        this.validateCreate(data);

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

        this.validateUpdate(data);

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