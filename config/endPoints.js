const API_BASE_URL = process.env.SERVER;

export const API_END_POINTS = {
    login: API_BASE_URL + '/api/user/login',
    getAllPaginatedUser : API_BASE_URL + '/api/user/admin/fetch',
    getUserById: API_BASE_URL + '/api/user/fetch/',
    updateUserById : API_BASE_URL + '/api/user/update/',
    deleteUserById : API_BASE_URL + '/api/user/delete/',
    createUser: API_BASE_URL + '/api/user/register',
} 