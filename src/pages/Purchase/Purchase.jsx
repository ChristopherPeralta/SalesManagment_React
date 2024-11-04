import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPurchases, getDeletedPurchases, deletePurchase, restorePurchase } from '../../services/PurchaseServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function Purchase() {
    const [purchases, setPurchases] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const openDialog = () => {
        navigate('/compra');
    };

    function loadDeletedPurchases() {
        getDeletedPurchases()
          .then(response => {
            console.log('Deleted Purchases:', response.data);
            setPurchases(response.data);
            setMessage(''); 
          })
          .catch(error => {
            if (error.response) {
              // El servidor respondió con un estado fuera del rango 2xx
              console.error('Error response:', error.response.data);
              console.error('Error status:', error.response.status);
              console.error('Error headers:', error.response.headers);
              if (error.response.status === 404) {
                setMessage(error.response.data.message);
              }
            } else if (error.request) {
              // La solicitud fue hecha pero no se recibió respuesta
              console.error('Error request:', error.request);
            } else {
              // Algo pasó al configurar la solicitud
              console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
          });
    }

    function loadPurchases() {
        getPurchases()
          .then(response => {
            // Verifica la respuesta de la API
            console.log('Active Purchases:', response.data);
            setPurchases(response.data);
          })
          .catch(error => {
            console.error('Error al cargar las compras:', error);
          });
    }

    useEffect(() => {
        if (showDeleted) {
          loadDeletedPurchases();
        } else {
          loadPurchases();
        }
      }, [showDeleted]);

    function handleDelete(id) {
        deletePurchase(id)
          .then(() => {
            setPurchases(prevPurchases => prevPurchases.filter(purchase => purchase.id !== id));
        })
          .catch(error => {
            console.error('Error al eliminar la compra:', error);
        });
    }

    function handleRestore(id) {
        restorePurchase(id)
            .then(() => {
                setPurchases(prevPurchases => {
                    const restoredPurchase = prevPurchases.find(purchase => purchase.id === id);
                    if (restoredPurchase) {
                        restoredPurchase.deletedAt = null;
                    }
                    return [...prevPurchases];
                });
                loadDeletedPurchases(); 
            })
            .catch(error => {
                console.error('Error al restaurar la compra:', error);
            });
    }

    function toggleShowDeleted() {
        setShowDeleted(prevShowDeleted => !prevShowDeleted);
        setMessage(''); // Limpia el mensaje
    }

    const filteredPurchases = purchases.filter(purchase => {
        const matchesDeletedStatus = showDeleted ? purchase.deletedAt !== null : purchase.deletedAt === null;
        const matchesSearchTerm = new Date(purchase.createdAt).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDeletedStatus && matchesSearchTerm;
    });
    

    return (
        <div className="flex flex-col items-center min-h-screen py-2 bg-custom-pink max-w-full">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold text-custom-purple mr-4">Compras</h1>
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
                placeholder="Buscar por fecha de creación" 
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
                <table className="w-full md:w-3/4 divide-y divide-gray-200">
                    <thead className="bg-custom-purple">
                        <tr>
                        <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Fecha de Creación</th>
                            <th className="px-6 py-3 text-xs font-medium text-left text-white uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-primary-pink divide-y divide-pink-200">
                            {filteredPurchases.map(purchase => (
                            <tr key={purchase.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{purchase.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{purchase.total}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{new Date(purchase.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                
                                {!showDeleted && (
                <>
                  <button 
                    onClick={() => handleDelete(purchase.id)} 
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
                
                {showDeleted && (
                <button 
                  onClick={() => handleRestore(purchase.id)} 
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
        </div>
    );
}

export default Purchase;