import API_BASE_URL from '../../config/apiConfig.js';
import axios from 'axios';

export function getBrands() {
    return axios.get(`${API_BASE_URL}/brand`);
}

export function getDeletedBrands() {
    return axios.get(`${API_BASE_URL}/brand/deleted`)
}

export function getBrand(id) {
    return axios.get(`${API_BASE_URL}/brand/${id}`);
}

export function createBrand(brandData) {
    return axios.post(`${API_BASE_URL}/brand`, brandData);
}

export function updateBrand(id, updatedData) {
    return axios.put(`${API_BASE_URL}/brand/${id}`, updatedData);
}

export function deleteBrand(id) {
    return axios.delete(`${API_BASE_URL}/brand/${id}`);
}

export function restoreBrand(id) {
    return axios.patch(`${API_BASE_URL}/brand/restore/${id}`)
}