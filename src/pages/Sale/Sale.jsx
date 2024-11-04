import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSales, getDeletedSales, deleteSale, restoreSale } from '../../services/SaleServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function Sale() {
    const [sales, setSales] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const openDialog = () => {
        navigate('/venta');
    };

    function loadDeletedSales() {
        getDeletedSales()
          .then(response => {
            console.log('Deleted Sales:', response.data);
            setSales(response.data);
            setMessage(''); 
          })
          .catch(error => {
            if (error.response) {
              console.error('Error response:', error.response.data);
              console.error('Error status:', error.response.status);
              console.error('Error headers:', error.response.headers);
              if (error.response.status === 404) {
                setMessage(error.response.data.message);
              }
            } else if (error.request) {
              console.error('Error request:', error.request);
            } else {
              console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
          });
    }

    function loadSales() {
        getSales()
          .then(response => {
            console.log('Active Sales:', response.data);
            setSales(response.data);
          })
          .catch(error => {
            console.error('Error al cargar las ventas:', error);
          });
    }

    useEffect(() => {
        if (showDeleted) {
          loadDeletedSales();
        } else {
          loadSales();
        }
      }, [showDeleted]);

    function handleDelete(id) {
        deleteSale(id)
          .then(() => {
            setSales(prevSales => prevSales.filter(sale => sale.id !== id));
        })
          .catch(error => {
            console.error('Error al eliminar la venta:', error);
        });
    }

    function handleRestore(id) {
        restoreSale(id)
            .then(() => {
                setSales(prevSales => {
                    const restoredSale = prevSales.find(sale => sale.id === id);
                    if (restoredSale) {
                        restoredSale.deletedAt = null;
                    }
                    return [...prevSales];
                });
                loadDeletedSales(); 
            })
            .catch(error => {
                console.error('Error al restaurar la venta:', error);
            });
    }

    function toggleShowDeleted() {
        setShowDeleted(prevShowDeleted => !prevShowDeleted);
        setMessage(''); 
    }

    const filteredSales = sales.filter(sale => {
        const matchesDeletedStatus = showDeleted ? sale.deletedAt !== null : sale.deletedAt === null;
        const matchesSearchTerm = new Date(sale.createdAt).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDeletedStatus && matchesSearchTerm;
    });
    

    return (
        <div className="flex flex-col items-center min-h-screen py-2 bg-custom-pink max-w-full">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold text-custom-purple mr-4">Ventas</h1>
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
                            {filteredSales.map(sale => (
                            <tr key={sale.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{sale.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{sale.total}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black">{new Date(sale.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                
                                {!showDeleted && (
                <>
                  <button 
                    onClick={() => handleDelete(sale.id)} 
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
                
                {showDeleted && (
                <button 
                  onClick={() => handleRestore(sale.id)} 
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

export default Sale;