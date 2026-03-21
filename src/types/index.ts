export type Product = {
    /** uuid v4 */
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
};

export type EnvModeType = 'development' | 'production';