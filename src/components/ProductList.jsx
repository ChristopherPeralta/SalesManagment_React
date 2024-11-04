import React from 'react';
import PropTypes from 'prop-types';

function ProductList({ products, onRemoveProduct }) {
    return (
        <ul>
            {products.map(product => (
            <li key={product.id}>
                {product.id} - {product.quantity}
                <button onClick={() => onRemoveProduct(product.id)}>Eliminar</button>
            </li>
        ))}
        </ul>
    );
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
    })).isRequired,
    onRemoveProduct: PropTypes.func.isRequired,
};

export default ProductList;