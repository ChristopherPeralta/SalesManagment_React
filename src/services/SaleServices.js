import API_BASE_URL from '../../config/apiConfig.js';
import axios from 'axios';

export function getSales() {
    return axios.get(`${API_BASE_URL}/sale`);
}

export function getDeletedSales() {
    return axios.get(`${API_BASE_URL}/sale/deleted`);
}

export function getSale(id) {
    return axios.get(`${API_BASE_URL}/sale/${id}`);
}

export function createSale(saleData) {
    return axios.post(`${API_BASE_URL}/sale`, saleData);
}

export function deleteSale(id) {
    return axios.delete(`${API_BASE_URL}/sale/${id}`);
}

export function restoreSale(id) {
    return axios.patch(`${API_BASE_URL}/sale/restore/${id}`);
}

export function getDetailSale(id) {
    return axios.get(`${API_BASE_URL}/detailsale/${id}`);
}