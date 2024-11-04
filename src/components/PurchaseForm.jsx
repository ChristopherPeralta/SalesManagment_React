import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectWithSearch from './SelectWithSearch';
import { getProducts } from './api'; // Asegúrate de tener esta función en tu archivo de API
import DialogProduct from './DialogProduct'; // Importa DialogProduct

const PurchaseForm = ({ onAddProduct }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        getProducts().then(setProducts); // Asegúrate de que esta función está definida en tu archivo de API
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddProduct({ product, quantity, price });
        setProduct(null);
        setQuantity(1);
        setPrice(0);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SelectWithSearch
                    label="Producto"
                    id="product"
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    options={products}
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Cantidad"
                    className="ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none sm:text-sm rounded-md py-1 px-2"
                />
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Precio"
                    className="ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none sm:text-sm rounded-md py-1 px-2"
                />
                <button type="submit" className="mt-2 bg-purple-500 text-white py-1 px-4 rounded-md">
                    Agregar producto
                </button>
            </form>
            <button onClick={handleOpenDialog} className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md">
                Abrir diálogo de producto
            </button>
            {isDialogOpen && <DialogProduct onClose={handleCloseDialog} />}
        </div>
    );
};

PurchaseForm.propTypes = {
    onAddProduct: PropTypes.func.isRequired,
};

export default PurchaseForm;