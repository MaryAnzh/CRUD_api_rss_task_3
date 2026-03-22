export type CreateProductType = {
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
}

export type CreateProductKeysType = keyof CreateProductType;

export type Product = {
    /** uuid v4 */
    id: string;
} & CreateProductType;

export type EnvModeType = 'development' | 'production';