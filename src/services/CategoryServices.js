import API_BASE_URL from '../../config/apiConfig.js';
import axios from 'axios';

export function getCategorys() {
    return axios.get(`${API_BASE_URL}/category`);
}

export function getDeletedCategorys() {
    return axios.get(`${API_BASE_URL}/category/deleted`)
}

export function getCategory(id) {
    return axios.get(`${API_BASE_URL}/category/${id}`);
}

export function createCategory(categoryData) {
    return axios.post(`${API_BASE_URL}/category`, categoryData);
}

export function updateCategory(id, updatedData) {
    return axios.put(`${API_BASE_URL}/category/${id}`, updatedData);
}

export function deleteCategory(id) {
    return axios.delete(`${API_BASE_URL}/category/${id}`);
}

export function restoreCategory(id) {
    return axios.patch(`${API_BASE_URL}/category/restore/${id}`)
}