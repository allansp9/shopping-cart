import { put, call, takeLatest, fork } from 'redux-saga/effects';
import {
  addToCartSuccess,
  addToCartFailure,
  fetchCartSuccess,
  fetchCartFailure,
  removeFromCartSuccess,
  removeFromCartFailure,
} from './actions';
import { ADD_TO_CART, FETCH_CART, REMOVE_FROM_CART, UPDATE_QT } from '../actionTypes';
import * as cartApi from '../../libs/cart/api';

export function* fetchCart() {
  try {
    const cart = yield call(cartApi.fetch); // faz uma api call e armazena no cart
    yield put(fetchCartSuccess(cart)); // passa o cart para o action fetchCartSuccess
  } catch (error) {
    yield put(fetchCartFailure(error));
  }
}

export function* addToCart(action) {
  try {
    const cart = yield call(
      cartApi.addToCart,
      action.productId,
      action.productPrice,
      action.quantity,
    );
    yield put(addToCartSuccess(cart));
  } catch (error) {
    yield put(addToCartFailure(error));
  }
}

export function* removeFromCart(action) {
  try {
    const cart = yield call(cartApi.removeFromCart, action.productId, action.productPrice);
    yield put(removeFromCartSuccess(cart));
  } catch (error) {
    yield put(removeFromCartFailure(error));
  }
}

// pega apenas a ultima action call feita e atribui a seu respectivo worker saga
export function* watchFetchCart() {
  yield takeLatest(FETCH_CART, fetchCart);
}

export function* watchAddToCart() {
  yield takeLatest(ADD_TO_CART, addToCart);
}

export function* watchRemoveFromCart() {
  yield takeLatest(REMOVE_FROM_CART, removeFromCart);
}

export default function* () {
  yield fork(watchFetchCart);
  yield fork(watchAddToCart);
  yield fork(watchRemoveFromCart);
}
