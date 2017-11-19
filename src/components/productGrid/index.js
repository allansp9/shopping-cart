import React from 'react';
import PropTypes from 'prop-types';

const ProductGrid = ({ products, addToCart }) => (
  <div>
    {products.map(product => (
      <div key={product._id}>
        <div src={product.picture} />
        <div>{product.name}</div>
        <p>{product.price}</p>
        <button onClick={() => addToCart(product)}> Add to Cart </button>
      </div>
    ))}
  </div>
);

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductGrid;
