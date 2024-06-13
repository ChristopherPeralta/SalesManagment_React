import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [message, setMessage] = useState('');


  function loadDeletedCategories() {
    axios.get(`${API_BASE_URL}/category/deleted`)
      .then(response => {
        setCategories(response.data);
        setMessage(''); // Limpia cualquier mensaje anterior
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setMessage(error.response.data.message);
        } else {
          console.error('Error al cargar las categorías eliminadas:', error);
        }
      });
  }

  

  function loadCategories() {
    axios.get(`${API_BASE_URL}/category`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error al cargar las categorías:', error);
      });
  }

  useEffect(() => {
    if (showDeleted) {
      loadDeletedCategories();
    } else {
      loadCategories();
    }
  }, [showDeleted]);

  function handleAdd() {
    const name = prompt('Por favor, introduce el nombre de la nueva categoría');
  
    if (name) {
      axios.post(`${API_BASE_URL}/category`, { name })
        .then(response => {
          setCategories(prevCategories => [...prevCategories, response.data]);
        })
        .catch(error => {
          console.error('Error al crear la categoría:', error);
        });
    }
  }

  function handleEdit(id) {
    const newName = prompt('Por favor, introduce el nuevo nombre de la categoría');
  
    if (newName) {
      axios.put(`${API_BASE_URL}/category/${id}`, { name: newName })
        .then(response => {
          setCategories(prevCategories => prevCategories.map(category =>
            category.id === id ? response.data : category
          ));
        })
        .catch(error => {
          console.error('Error al actualizar la categoría:', error);
        });
    }
  }

  function handleDelete(id) {
    axios.delete(`${API_BASE_URL}/category/${id}`)
      .then(() => {
        setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar la categoría:', error);
      });
  }

  function handleRestore(id) {
    axios.patch(`${API_BASE_URL}/category/restore/${id}`)
      .then(() => {
        loadDeletedCategories(); // Recarga las categorías eliminadas
      })
      .catch(error => {
        console.error('Error al restaurar la categoría:', error);
      });
  }

  function toggleShowDeleted() {
    setShowDeleted(prevShowDeleted => !prevShowDeleted);
    setMessage(''); // Limpia el mensaje
  }
  

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-5">Categorías</h1>
      <button 
        onClick={handleAdd} 
        className="px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Agregar
      </button>
      <button onClick={toggleShowDeleted}>
        {showDeleted ? 'Mostrar categorías activas' : 'Mostrar categorías eliminadas'}
      </button>
      
    
      <table className="w-full divide-y divide-gray-200"></table>
      {message && <p>{message}</p>}
      {!message && categories.length > 0 && (
      <table className="w-full md:w-3/4 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map(category => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                
              {!showDeleted && (
                <>
                  <button 
                    onClick={() => handleEdit(category.id)} 
                    className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id)} 
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </>
              )}
                
                {showDeleted && (
                <button 
                  onClick={() => handleRestore(category.id)} 
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
    </div>
  );
}

export default CategoryList;