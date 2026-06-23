const API_URL = process.env.REACT_APP_API_URL || '/api';

export const endpoints = {
    auth: {
        register: `${API_URL}/auth/register`,
        login: `${API_URL}/auth/login`,
    },
    products: `${API_URL}/products`,
    cart: `${API_URL}/cart`,
};

export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}; 