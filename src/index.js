import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fetchProducts } from "./state/product/actions";
import App from "./App";
import configureStore from "./state/store";
import registerServiceWorker from "./registerServiceWorker";
import * as productApi from "./libs/product/api";

const store = configureStore({});

store.dispatch(fetchProducts());

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
