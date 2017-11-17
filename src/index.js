import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./state/store";
import registerServiceWorker from "./registerServiceWorker";
import * as productApi from "./libs/product/api";

productApi.fetchAll().then(products => console.log("products", products));

const store = configureStore({});

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
