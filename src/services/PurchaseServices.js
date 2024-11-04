import API_BASE_URL from '../../config/apiConfig.js';
import axios from 'axios';

export function getPurchases() {
    return axios.get(`${API_BASE_URL}/purchase`);
}

export function getDeletedPurchases() {
    return axios.get(`${API_BASE_URL}/purchase/deleted`);
}

export function getPurchase(id) {
    return axios.get(`${API_BASE_URL}/purchase/${id}`);
}

export function createPurchase(purchaseData) {
    return axios.post(`${API_BASE_URL}/purchase`, purchaseData);
}

export function deletePurchase(id) {
    return axios.delete(`${API_BASE_URL}/purchase/${id}`);
}

export function restorePurchase(id) {
    return axios.patch(`${API_BASE_URL}/purchase/restore/${id}`);
}

export function getDetailPurchase(id) {
    return axios.get(`${API_BASE_URL}/detailpurchase/${id}`);
}