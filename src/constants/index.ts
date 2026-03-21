// in big projects, it's common to have a constants file to store all the constant values used throughout the application. 
// This helps to keep the code organized and makes it easier to manage and update constant values in one place.
/** dictionary */
export const {
    PRODUCT_NOT_FOUND,
    SERVER_RUNNING_MASSAGE
}
    =
{
    PRODUCT_NOT_FOUND: 'Product not found',
    SERVER_RUNNING_MASSAGE: 'Server running on port',
};

/** Routes */
export const APP_ROUTE = '/api/products';
export const APP_PORT = 3000;
export const APP_PORT_TEST = 3001;
export const FIRST_WORKER_PORT = 4001;

/** product data */
export const START_DATA = [
    {
        id: '123_example',
        name: "Product 1",
        description: "Description for product 1",
        price: 10.99,
        category: "Category A",
        inStock: true
    },
    {
        id: '124_example',
        name: "Product 1",
        description: "Description for product 1",
        price: 10.99,
        category: "Category A",
        inStock: true
    },
];