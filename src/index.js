import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./state/store";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore({});

console.log(store.getState());

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
