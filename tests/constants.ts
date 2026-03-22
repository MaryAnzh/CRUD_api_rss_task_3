export const BASE_URL = (port: number, route: string) =>
    `http://localhost:${port}${route}`;

export const PRODUCT_NOT_FOUND_ID = "00000000-0000-0000-0000-000000000000";

export const UPDATED_PRODUCT = {
    name: "Updated Product",
    description: "Updated description",
    price: 999
};