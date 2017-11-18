import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { removeFromCart } from '../../state/cart/sagas';

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
const CartTable = ({ cart, removeFromCart }) => (
  <Wrapper>
    <thead>
      <tr>
        <th>Produto</th>
        <th>Preço</th>
        <th>Quantidade</th>
      </tr>
    </thead>
    <tbody>
      {cart.items.map(item => (
        <tr key={item.productId}>
          <td>
            {item.product.name}
            <button onClick={() => removeFromCart(item.productId)}>delete</button>
          </td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
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
  }).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartTable;
