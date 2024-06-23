import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../config/apiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Category.css';
import DialogCategory from '../../components/DialogCategory';

function Category() {
  const [categories, setCategories] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);

  
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setSelectedCategory(null);
    setDialogOpen(true);
  };
  
  const closeDialog = () => {
    setDialogOpen(false);
  };

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

  function handleAdd(name) {
    axios.post(`${API_BASE_URL}/category`, { name })
      .then(response => {
        setCategories(prevCategories => [...prevCategories, response.data]);
        closeDialog();
      })
      .catch(error => {
        console.error('Error al crear la categoría:', error);
      });
  }
  
  function handleEdit(id, newName) {
    axios.put(`${API_BASE_URL}/category/${id}`, { name: newName })
      .then(response => {
        setCategories(prevCategories => prevCategories.map(category =>
          category.id === id ? response.data : category
        ));
        closeDialog();
      })
      .catch(error => {
        console.error('Error al actualizar la categoría:', error);
      });
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
    <div className="flex flex-col items-center min-h-screen py-2 bg-custom-pink max-w-full">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-bold text-custom-purple mr-4">Categorías</h1>
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
          {showDeleted ? 'Mostrar categorías activas' : 'Mostrar categorías eliminadas'}
        </div>
      </label>
      </div>
      
      
      <table className="w-full divide-y divide-gray-200"></table>
      {message && <p className="text-xl text-red-600">{message}</p>}
      {!message && categories.length > 0 && (
      <table className="w-full md:w-3/4 divide-y divide-gray-200">
        <thead className="bg-custom-purple">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-primary-pink divide-y divide-pink-200">
              {categories.filter(category => 
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(category => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap text-black">{category.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                
              {!showDeleted && (
                <>
                  <button 
                    onClick={() => {
                      setSelectedCategory(category);
                      setDialogOpen(true);
                    }} 
                    className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id)} 
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
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
      <DialogCategory
        dialogOpen={dialogOpen} 
        closeDialog={closeDialog} 
        initialName={selectedCategory ? selectedCategory.name : ''} 
        onSubmit={selectedCategory ? (name) => handleEdit(selectedCategory.id, name) : handleAdd} 
      />
    </div>

    
  );
}

export default Category;