import API_BASE_URL from '../../config/apiConfig.js';
import axios from 'axios';

export function getProducts() {
    return axios.get(`${API_BASE_URL}/product`);
}

export function getDeletedProducts() {
    return axios.get(`${API_BASE_URL}/product/deleted`)
}

export function getProduct(id) {
    return axios.get(`${API_BASE_URL}/product/${id}`);
}

export function createProduct(productData) {
    return axios.post(`${API_BASE_URL}/product`, productData);
}

export function updateProduct(id, updatedData) {
    return axios.put(`${API_BASE_URL}/product/${id}`, updatedData);
}

export function deleteProduct(id) {
    return axios.delete(`${API_BASE_URL}/product/${id}`);
}

export function restoreProduct(id) {
    return axios.patch(`${API_BASE_URL}/product/restore/${id}`)
}

export function getProductsByBrandAndCategory(brand, category) {
    return axios.get(`${API_BASE_URL}/productByBrandCategory`, {
        params: {
            brand: brand,
            category: category
        }
    });
}