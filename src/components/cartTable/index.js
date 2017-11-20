import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Delete from 'material-ui-icons/Delete';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  appBar: {
    position: 'relative',
  },
  toolBar: {
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function getSum(totalPrice) {
  return totalPrice.reduce((sum, value) => sum + value, 0).toFixed(2);
}

const CartTable = ({
  cart, removeFromCart, classes, open, handleRequestClose,
}) => (
  <Dialog fullScreen open={open} onRequestClose={handleRequestClose} transition={Transition}>
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Typography type="title" color="inherit">
          Carrinho
        </Typography>
        <IconButton color="contrast" onClick={handleRequestClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell padding="dense" />
            <TableCell>Quantidade</TableCell>
            <TableCell>Preço (unidade)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.items.map(item => (
            <TableRow key={item.productId}>
              <TableCell>{item.product.name}</TableCell>
              <TableCell padding="dense">
                <IconButton
                  color="primary"
                  onClick={() => removeFromCart(item)}
                  aria-label="Remover do carrinho"
                >
                  <Delete />
                </IconButton>
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>R$ {item.product.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Typography type="subheading">Total: R${getSum(cart.totalPrice)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  </Dialog>
);

export default withStyles(styles)(CartTable);
