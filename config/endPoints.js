const API_BASE_URL = process.env.SERVER;

export const API_END_POINTS = {
    login: API_BASE_URL + '/api/user/login',
    getAllPaginatedUser : API_BASE_URL + '/api/user/admin/fetch',
    getUserById: API_BASE_URL + '/api/user/fetch/',
    updateUserById : API_BASE_URL + '/api/user/update/',
    deleteUserById : API_BASE_URL + '/api/user/delete/',
    createUser: API_BASE_URL + '/api/user/register',

    getAllPaginatedProduct : API_BASE_URL + '/api/product/admin/fetch',
    getProductById: API_BASE_URL + '/api/product/fetch/',
    updateProductById : API_BASE_URL + '/api/product/update/',
    deleteProductById : API_BASE_URL + '/api/product/delete/',
    createProduct: API_BASE_URL + '/api/product/create',
} 