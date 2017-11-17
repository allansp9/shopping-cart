import React, { Component } from "react";
import { connect } from "react-redux";
import ProductsGrid from "./components/productGrid";
import { fetchProducts } from "./state/product/actions";

class App extends Component {
  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    const { isProductLoading, products } = this.props;

    if (isProductLoading) {
      return <h2>Carregando Loja...</h2>;
    }

    return (
      <div className="App">
        <h1>shopping cart</h1>
        <ProductsGrid products={products} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isProductLoading: state.product.isLoading,
  products: state.product.products
});

const mapDispatchToProps = {
  fetchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
