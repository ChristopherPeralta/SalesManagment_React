import React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { getProducts, getDeletedProducts, createProduct, updateProduct, deleteProduct, restoreProduct } from '../../services/ProductServices';
import DialogProduct from '../../components/DialogProduct';


function Product() {

    const [products, setProducts] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedProduct, setselectedProduct] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setselectedProduct(null);
        setDialogOpen(true);
      };
      
    const closeDialog = () => {
        setDialogOpen(false);
    };

    function toggleShowDeleted() {
        setShowDeleted(prevShowDeleted => !prevShowDeleted);
        setMessage(''); // Limpia el mensaje
    }
    

    function loadDeletedProducts() {
        getDeletedProducts()
          .then(response => {
            setProducts(response.data);
            setMessage(''); // Limpia cualquier mensaje anterior
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setMessage(error.response.data.message);
            } else {
              console.error('Error al cargar los productos eliminados:', error);
            }
          });
      }
    
      function loadProducts() {
        getProducts()
          .then(response => {
            setProducts(response.data);
          })
          .catch(error => {
            console.error('Error al cargar los productos:', error);
          });
      }
    
      useEffect(() => {
        if (showDeleted) {
            loadDeletedProducts();
        } else {
            loadProducts();
        }
      }, [showDeleted]);

      function handleAdd({ name, price, weight, unit, categoryId, brandId }) {
        if (!categoryId || !brandId) {
          console.error('categoryId o brandId son undefined');
          return;
        }
      createProduct({ name, price, weight, unit, categoryId, brandId })
      .then(response => {
            if (response && response.data && typeof response.data === 'object' && response.data.name) {
              setProducts(prevCategories => [...prevCategories, response.data]);
              loadProducts();
            } else {
              console.error('La respuesta no contiene los datos esperados:', response);
            }
            closeDialog();
          })
          .catch(error => {
            console.error('Error al crear la producto:', error);
          });
      }
      
      function handleEdit(id, newName, price, weight, unit, categoryId, brandId) {
        console.log('categoría:', categoryId);
        console.log('marca:', brandId);
        console.log('id:', id);
        console.log('newName:', newName);
        console.log('price:', price);
        console.log('weight:', weight);
        console.log('unit:', unit);
      updateProduct(id, newName, price, weight, unit, categoryId, brandId)
        .then(response => {
          setProducts(prevCategories => prevCategories.map(product =>
            product.id === id ? response.data : product
          ));
          loadProducts();
          closeDialog();
        })
        .catch(error => {
          console.error('Error al actualizar la producto:', error);
        });
      }
    
      function handleDelete(id) {
        deleteProduct(id)
          .then(() => {
            setProducts(prevCategories => prevCategories.filter(product => product.id !== id));
          })
          .catch(error => {
            console.error('Error al eliminar la producto:', error);
          });
      }
    
      function handleRestore(id) {
        restoreProduct(id)
          .then(() => {
            loadDeletedProducts(); // Recarga las productos eliminadas
          })
          .catch(error => {
            console.error('Error al restaurar la producto:', error);
          });
      }


      return (
        <div className="flex flex-col items-center min-h-screen py-2 bg-custom-pink max-w-full">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-custom-purple mr-4">Productos</h1>
            <button 
              onClick={openDialog} 
              className="px-4 py-2 font-bold text-white bg-custom-purple rounded hover:bg-purple-900"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <input 
              type="text" 
              placeholder="Buscar por nombre" 
              value={searchTerm} 
              onChange={event => setSearchTerm(event.target.value)} 
              className="w-full md:w-1/2 px-3 py-2 mb-4 mr-4 md:mb-0 text-gray-700 bg-gray-00 rounded shadow focus:outline-none focus:bg-primary-pink placeholder-gray-500"
            />
    
          <label className="flex items-center cursor-pointer md:mt-0">
            <div className="relative">
              <input type="checkbox" className="hidden" checked={showDeleted} onChange={toggleShowDeleted} />
              <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner transform transition-all duration-200"></div>
              <div className="toggle__dot absolute top-[-0.2rem] w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">
              {showDeleted ? 'Mostrar productos activas' : 'Mostrar productos eliminadas'}
            </div>
          </label>
          </div>
          
          
          <table className="w-full divide-y divide-gray-200"></table>
          {message && <p className="text-xl text-red-600">{message}</p>}
          {!message && products.length > 0 && (
          <table className="w-full md:w-3/4 divide-y divide-gray-200">
            <thead className="bg-custom-purple">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Peso</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">PV</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">PC</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">PM</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-primary-pink divide-y divide-pink-200">
                  {products.filter(product => 
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).map(product => (
                <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.category ? product.category.name : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.brand ? product.brand.name : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.purchasePrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{product.averageCost}</td>   
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    
                    
                  {!showDeleted && (
                    <>
                      <button 
                        onClick={() => {
                          setselectedProduct(product);
                          setDialogOpen(true);
                        }} 
                        className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                    
                    {showDeleted && (
                    <button 
                      onClick={() => handleRestore(product.id)} 
                      className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700"
                    >
                      Recuperar
                    </button>
          )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
            <DialogProduct
              dialogOpen={dialogOpen} 
              closeDialog={closeDialog} 
              initialProduct={selectedProduct ? selectedProduct : {}}
              onSubmit={(name, price, weight, unit, categoryId, brandId) => {
                if (selectedProduct) {
                  handleEdit(selectedProduct.id, name, categoryId, brandId, weight, unit, price);
                } else {
                  handleAdd(name, price, weight, unit, categoryId, brandId);
                }
              }} 
            />
            </div>
      );

}

export default Product;