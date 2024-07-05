import React, { useState, useEffect } from 'react';
import { getCategorys } from '../services/CategoryServices';
import { getBrands } from '../services/BrandServices';
import Dropdown from './dropdown/Dropdown';


const DialogProduct = ({ dialogOpen, closeDialog, initialProduct = { name: '', categoryId: '', brandId: '' }, onSubmit }) => {
    const [product, setProduct] = useState(initialProduct);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [searchBrand, setSearchBrand] = useState('');

    const filteredBrands = brands.filter(brands =>
      brands.name.toLowerCase().includes(searchBrand.toLowerCase())
    );

    useEffect(() => {
    if (dialogOpen) {
        loadCategories();
        loadBrands();
        if (initialProduct.name || initialProduct.categoryId || initialProduct.brandId) {
            console.log(initialProduct); // Imprime los datos del producto inicial
            const { brand, category, weight, ...rest } = initialProduct;
            const [weightValue, unit] = weight.split(' ');
            setProduct({
                ...rest,
                brandId: brand.id,
                categoryId: category.id,
                weight: weightValue,
                unit
            });
          }
      } else {
        // Restablece el estado del producto cuando el diálogo está cerrado
        setProduct({ name: '', categoryId: '', brandId: '' });
      }  
    }, [dialogOpen, initialProduct]);
      
    
      const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        setProduct((prevProduct) => ({
            ...prevProduct,
            [event.target.name]: event.target.value,
        }));
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(product);
      };
    
      function loadCategories() {
        getCategorys()
          .then(response => {
            setCategories(response.data);
          })
          .catch(error => {
            console.error('Error al cargar las categorías:', error);
          });
      }
    
      function loadBrands() {
        getBrands()
          .then(response => {
            setBrands(response.data);
          })
          .catch(error => {
            console.error('Error al cargar las marcas:', error);
          });
      }

  return (
    dialogOpen && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <form onSubmit={handleSubmit}>

                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full sm:text-sm rounded-md p-2"
                  value={product.name}
                  onChange={handleChange}
                />


                <Dropdown
                  id="categoryId"
                  value={product.categoryId}
                  onChange={handleChange}
                  options={categories}
                />


                <Dropdown
                  id="brandId"
                  value={product.brandId}
                  onChange={handleChange}
                  options={brands}
                />

                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Cantidad
                </label>
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  className="ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full sm:text-sm rounded-md p-2"
                  value={product.weight}
                  onChange={handleChange}
                />

                <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                  Unidad metrica (gr, ml)
                </label>
                <input
                  type="unit"
                  name="unit"
                  id="unit"
                  className="ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full sm:text-sm rounded-md p-2"
                  value={product.unit}
                  onChange={handleChange}
                />
  
                <label htmlFor="npriceame" className="block text-sm font-medium text-gray-700">
                  Precio de venta
                </label>
                <input
                  type="price"
                  name="price"
                  id="price"
                  className="ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full sm:text-sm rounded-md p-2"
                  value={product.price}
                  onChange={handleChange}
                />
                
                <button type="submit" className="mt-4 mr-4 px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
                  Enviar
                </button>
                <button 
                  type="button" 
                  className="mt-4 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  onClick={closeDialog}
                  >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DialogProduct;