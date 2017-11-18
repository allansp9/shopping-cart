import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductsGrid from './components/productGrid';
import CartTable from './components/cartTable';
import { fetchProducts } from './state/product/actions';
import { fetchCart, addToCart, removeFromCart } from './state/cart/actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchProducts();
    this.props.fetchCart();
  }

  addToCart = product => {
    this.props.addToCart(product._id, 1);
  };

  removeFromCart = product => {
    this.props.removeFromCart(product);
  };

  render() {
    const { cart, isProductLoading, products } = this.props;

    if (isProductLoading) {
      return <h2>Carregando Loja...</h2>;
    }

    return (
      <div className="App">
        <ProductsGrid products={products} addToCart={this.addToCart} />
        <h1>Carrinho</h1>
        <CartTable cart={cart} removeFromCart={this.removeFromCart} />
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
