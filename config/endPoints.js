const API_BASE_URL = process.env.SERVER;

export const API_END_POINTS = {
    login: API_BASE_URL + '/api/login',
    getAllPaginatedUser : API_BASE_URL + '/api/users/paginated',
    getUserById: API_BASE_URL + '/api/users/',
    updateUserById : API_BASE_URL + '/api/users/',
    deleteUserById : API_BASE_URL + '/api/users/',

    getAllCategory: API_BASE_URL + '/api/category/all',
    getAllPaginateCategory: API_BASE_URL + '/api/category/admin/all',
    getCategoryById: API_BASE_URL + '/api/category/get/',
    updateCategoryById: API_BASE_URL + '/api/category/update/',
    createCategory: API_BASE_URL + '/api/category/add',
    deleteCategory: API_BASE_URL + '/api/category/delete/',
    getAllSubCategory: API_BASE_URL + '/api/sub-category/admin/all',
    createSubCategory: API_BASE_URL + '/api/sub-category/add',
    deleteSubCategory: API_BASE_URL + '/api/sub-category/delete/',
    updateSubCategoryById: API_BASE_URL + '/api/sub-category/update/',
    getSubCategoryById: API_BASE_URL + '/api/sub-category/get/',
    getAllPaginateProduct: API_BASE_URL + '/api/product/admin/all',
    deleteProduct: API_BASE_URL + '/api/product/delete/',
    getSubCategoryWithCategoryId : API_BASE_URL + '/api/sub-category/getByCategory/',
    createProduct: API_BASE_URL + '/api/product/add',
} 