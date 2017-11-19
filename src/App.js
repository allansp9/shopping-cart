import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import ProductsGrid from './components/productGrid';
import CartTable from './components/cartTable';
import { fetchProducts } from './state/product/actions';
import { fetchCart, addToCart, removeFromCart } from './state/cart/actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCart();
  }

  state = {
    open: false,
  };

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
    const { cart, isProductLoading, products } = this.props;

    if (isProductLoading) {
      return <h2>Carregando Loja...</h2>;
    }

    return (
      <div className="App">
        <Button onClick={this.handleClickOpen}>Open full-screen dialog</Button>
        <CartTable
          cart={cart}
          open={this.state.open}
          handleClickOpen={this.handleClickOpen}
          handleRequestClose={this.handleRequestClose}
          removeFromCart={this.removeFromCart}
        />
        <h1>Produtos</h1>
        <ProductsGrid products={products} addToCart={this.addToCart} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
