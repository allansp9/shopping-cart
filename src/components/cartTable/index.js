import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.table`
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  tr:nth-child(even) {
    background: #ddd;
  }
`;

function getSum(totalPrice) {
  return totalPrice.reduce((sum, value) => sum + value, 0);
}

const CartTable = ({ cart, removeFromCart }) => (
  <Wrapper>
    <thead>
      <tr>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Preço</th>
      </tr>
    </thead>
    <tbody>
      {cart.items.map(item => (
        <tr key={item.productId}>
          <td>
            {item.product.name}
            <button onClick={() => removeFromCart(item)}>delete</button>
          </td>
          <td>{item.quantity}</td>
          <td>R$ {item.product.price}</td>
        </tr>
      ))}
      <tr>
        <td>Total: R${getSum(cart.totalPrice)}</td>
      </tr>
    </tbody>
  </Wrapper>
);

CartTable.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      productId: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })).isRequired,
    // totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartTable;
