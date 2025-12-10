import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get single product by ID
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

// Get products by category
export const getProductsByCategory = async (category) => {
    try {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products in category ${category}:`, error);
        throw error;
    }
};

// Get all categories
export const getAllCategories = async () => {
    try {
        const response = await api.get('/products/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Get limited products
export const getLimitedProducts = async (limit = 8) => {
    try {
        const response = await api.get(`/products?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching limited products:', error);
        throw error;
    }
};

export default api;
