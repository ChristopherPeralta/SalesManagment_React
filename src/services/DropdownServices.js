import axios from 'axios';
import { getBrands } from './BrandServices';

export const getCategories = () => {
    return axios.get('http://localhost:3000/categories').then(response => response.data);
};

export { getBrands };

export const getProductsByBrandAndCategory = (brandId, categoryId) => {
    return axios.get(`http://localhost:3000/brands/${brandId}/categories/${categoryId}/products`).then(response => response.data);
};