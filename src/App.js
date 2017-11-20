import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'typeface-roboto';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { CartOutline, EmailOutline, GithubCircle } from 'mdi-material-ui';
import ProductsGrid from './components/productGrid';
import CartTable from './components/cartTable';
import { fetchProducts } from './state/product/actions';
import { fetchCart, addToCart, removeFromCart } from './state/cart/actions';

const styles = {
  flex: {
    justifyContent: 'space-between',
  },
  menuButton: {
    flex: 1,
  },
  icon: {
    color: 'white',
  },
  footer: {
    justifyContent: 'center',
  },
};

class App extends Component {
  state = {
    open: false,
  };
  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCart();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  addToCart = (product) => {
    this.props.addToCart(product._id, product.price, 1);
  };

  removeFromCart = (item) => {
    this.props.removeFromCart(item.productId, item.product.price);
  };

  render() {
    const {
      cart, isProductLoading, products, classes,
    } = this.props;

    if (isProductLoading) {
      return <h2>Carregando Loja...</h2>;
    }

    return (
      <div className={classes.App}>
        <AppBar>
          <Toolbar className={classes.flex}>
            <Typography type="title" color="inherit">
              Produtos
            </Typography>
            <IconButton onClick={this.handleClickOpen} className={classes.menuButton.flex}>
              <Badge className={classes.badge} badgeContent={cart.items.length} color="accent">
                <CartOutline className={classes.icon} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <CartTable
          cart={cart}
          open={this.state.open}
          handleClickOpen={this.handleClickOpen}
          handleRequestClose={this.handleRequestClose}
          removeFromCart={this.removeFromCart}
        />
        <ProductsGrid products={products} addToCart={this.addToCart} />
        <AppBar position="static" color="default">
          <Toolbar className={classes.footer}>
            <IconButton href="https://github.com/allansp9" target="_blank">
              <GithubCircle />
            </IconButton>
            <IconButton href="mailto:allansp9@gmail.com">
              <EmailOutline />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const getProductById = (products, productId) => products.find(p => p._id === productId);

const populateCartItems = (cart, products) => ({
  ...cart,
  items: cart.items.map(item => ({
    ...item,
    product: getProductById(products, item.productId),
  })),
  totalPrice: cart.totalPrice,
});

const mapStateToProps = state => ({
  isProductsLoading: state.product.isLoading,
  products: state.product.products,
  cart: populateCartItems(state.cart.cart, state.product.products),
});

const mapDispatchToProps = {
  fetchProducts,
  fetchCart,
  addToCart,
  removeFromCart,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
