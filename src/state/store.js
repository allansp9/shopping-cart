import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducer";
import createSagaMiddleware from "redux-saga";

export default initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancers = compose(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, initialState, enhancers);

  return store;
};
