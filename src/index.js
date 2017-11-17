import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fetchProducts } from "./state/product/actions";
import App from "./App";
import configureStore from "./state/store";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore({});

store.dispatch(fetchProducts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
