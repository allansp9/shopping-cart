import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function getSum(totalPrice) {
  return totalPrice.reduce((sum, value) => sum + value, 0);
}

const CartTable = ({
  cart, removeFromCart, classes, open, handleRequestClose,
}) => (
  <div>
    <Dialog fullScreen open={open} onRequestClose={handleRequestClose} transition={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="contrast" onClick={handleRequestClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <h1>Carrinho</h1>
      <thead>
        <tr>
          <th>Produto</th>
          <th />
          <th>Quantidade</th>
          <th>Preço (unidade)</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map(item => (
          <tr key={item.productId}>
            <td>{item.product.name}</td>
            <td>
              <button onClick={() => removeFromCart(item)}>remover</button>
            </td>
            <td>{item.quantity}</td>
            <td>R$ {item.product.price}</td>
          </tr>
        ))}
        <tr>
          <td>Total: R${getSum(cart.totalPrice)}</td>
        </tr>
      </tbody>
    </Dialog>
  </div>
);

export default withStyles(styles)(CartTable);
