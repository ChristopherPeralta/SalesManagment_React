import React, { useState, useEffect } from 'react';
import SelectWithSearch from './SelectWithSearch';
import { getBrands, getCategoriesByBrand, getProductsByBrandAndCategory } from './api'; // Asegúrate de tener estas funciones en tu archivo de API

const BrandCategoryProductSelector = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      getCategoriesByBrand(selectedBrand).then(setCategories);
    } else {
      setCategories([]);
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedBrand && selectedCategory) {
      getProductsByBrandAndCategory(selectedBrand, selectedCategory).then(setProducts);
    } else {
      setProducts([]);
    }
  }, [selectedBrand, selectedCategory]);

  return (
    <div>
      <SelectWithSearch
        label="Marca"
        id="brand"
        value={selectedBrand}
        onChange={e => setSelectedBrand(e.target.value)}
        options={brands}
      />
      <SelectWithSearch
        label="Categoría"
        id="category"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        options={categories}
      />
      <SelectWithSearch
        label="Producto"
        id="product"
        value={selectedProduct}
        onChange={e => setSelectedProduct(e.target.value)}
        options={products}
      />
    </div>
  );
};

export default BrandCategoryProductSelector;