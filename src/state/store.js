import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import sagas from "./sagas";
import reducer from "./reducer";

export default initialState => {
  const sagaMiddleware = createSagaMiddleware();

  const enhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, initialState, enhancers);

  sagas.map(sagaMiddleware.run);

  return store;
};
