import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/ProductServices';
import { createPurchase } from '../../services/PurchaseServices';
import DropdownProduct from '../../components/dropdown/DropdownProduct';
import InputField from '../../components/dropdown/InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

function FormPurchase() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        getProducts()
            .then(response => {
                console.log("Response from getProducts:", response.data);
                setAllProducts(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleAddProduct = () => {
        console.log("Selected Product:", selectedProduct);
        console.log("Quantity:", quantity);
        console.log("Price:", price);

        if (!selectedProduct || quantity <= 0 || price <= 0) {
            alert("Por favor, selecciona un producto y asegúrate de que la cantidad y el precio sean mayores que cero.");
            return;
        }

        console.log("All Products:", allProducts);
        const productToAdd = allProducts.find(product => product.id === Number(selectedProduct));
        console.log("Product to Add:", productToAdd);

        if (productToAdd) {
            setProducts([...products, { id: productToAdd.id, name: productToAdd.name, quantity, price }]);
            setSelectedProduct("");
            setQuantity(1);
            setPrice(0);
        }
    };

    const handleRemoveProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    const handleSavePurchase = () => {
        const purchaseData = {
            products: products.map(product => ({
                productId: product.id,
                quantity: product.quantity,
                price: product.price
            }))
        };
        console.log("Purchase Data to Send:", purchaseData);
    
        createPurchase(purchaseData)
            .then(response => {
                console.log("Response from createPurchase:", response.data);
                setSuccessMessage('Compra realizada con éxito');
                setProducts([]);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al realizar la compra');
            });
    };


    return (
        <div>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <DropdownProduct
                name="productId"
                label="Producto"
                id="productId"
                value={selectedProduct}
                onChange={e => {
                    console.log("Selected Product Changed:", e.target.value);
                    setSelectedProduct(e.target.value);
                }}
                options={allProducts.map(product => ({ value: product.id, label: product.name }))}
            />

            <InputField
                type="number"
                name="quantity"
                label="Cantidad"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
            />

            <InputField
                type="number"
                name="price"
                label="Precio Compra"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
            />

            <button 
                onClick={handleAddProduct}
                className="px-4 py-2 font-bold text-white bg-custom-purple rounded hover:bg-purple-900"
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <button 
                onClick={handleSavePurchase}
                className="px-4 py-2 ml-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            >
                <FontAwesomeIcon icon={faSave} />
            </button>

            <table className="min-w-full mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Producto</th>
                        <th className="px-4 py-2">Cantidad</th>
                        <th className="px-4 py-2">Precio</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {products.map(product => (
                        <tr key={product.id}>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">{product.quantity}</td>
                            <td className="border px-4 py-2">{product.price}</td>
                            <td className="border px-4 py-2">
                                <button 
                                    onClick={() => handleRemoveProduct(product.id)}
                                    className="px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSavePurchase} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 mt-4">
                Guardar Compra
            </button>
        </div>
    );
}

export default FormPurchase;