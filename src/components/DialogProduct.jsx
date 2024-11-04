import React, { useState, useEffect } from 'react';
import { getCategorys } from '../services/CategoryServices';
import { getBrands } from '../services/BrandServices';
import Dropdown from './dropdown/Dropdown';
import InputField from './dropdown/InputField';


const DialogProduct = ({ dialogOpen, closeDialog, initialProduct = { name: '', categoryId: '', brandId: '' }, onSubmit }) => {
    const [product, setProduct] = useState(initialProduct);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
      if (dialogOpen) {
        loadCategories();
        loadBrands();
        const { brand, category, weight, ...rest } = initialProduct;
        console.log('initialProduct:', initialProduct);
        const [weightValue, unit] = weight ? weight.split(' ') : [null, null];
        setProduct({
          ...rest,
          brandId: brand ? brand.id : 1,
          categoryId: category ? category.id : 1,
          weight: weightValue,
          unit
        });
      } else {
        // Restablece el estado del producto cuando el diálogo está cerrado
        setProduct({ name: '', categoryId: '', brandId: '' });
      }  
    }, [dialogOpen, initialProduct]);

      
    
    const handleChange = (event) => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [event.target.name]: event.target.value,
      }));
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('brandId antes de enviar:', product.brandId);
      console.log('categoryId antes de enviar:', product.categoryId);
      const finalProduct = {
        ...product,
        price: Number(product.price),
        weight: Number(product.weight),
      };
      console.log('handleSubmit:', finalProduct);
      onSubmit(finalProduct);
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

              <InputField
                name="name"
                label="Nombre"
                id="name"
                value={product.name}
                onChange={handleChange}
              />

              <Dropdown
                name="categoryId"
                label="Categoría"
                id="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                options={categories}
              />

              <Dropdown
                name="brandId"
                label="Marca"
                id="brandId"
                value={product.brandId}
                onChange={handleChange}
                options={brands}
              />
                
              <InputField
                id="weight"
                name="weight"
                label="Cantidad"
                value={product.weight}
                onChange={handleChange}
              />

              <InputField
                id="unit"
                name="unit"
                label="Unidad métrica (gr, ml)"
                value={product.unit}
                onChange={handleChange}
              />

              <InputField
                id="price"
                name="price"
                label="Precio"
                value={product.price}
                onChange={handleChange}
              />
                
                <button type="submit" className="mt-4 mr-4 px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
                  Agregar
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