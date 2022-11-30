import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productsActions } from "../reducer/ProductsReducer";
import { ProductsService } from "../../service/api/ProductsApi";

function* actGetListProducts() {
  try {
    yield put(productsActions.getListProductsLoading());

    let res = yield call(() => ProductsService.getProducts());
    let listProducts = res.data;
    console.log(listProducts);
    console.log(res);
    if (res.status === 200) {
      yield put(
        productsActions.getListProductsSuccess({ products: listProducts })
      );
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostProducts(newProducts) {
  try {
    console.log(newProducts);
    let { values } = newProducts;
    yield put(productsActions.getListProductsLoading());

    let res = yield call(() => ProductsService.postProducts(values));
    let listProducts = res.data;
    console.log(res);
    if (res.status === 201) {
      yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetListProducts() {
  yield takeLatest(SagaActionTypes.GET_LIST_PRODUCTS_SAGA, actGetListProducts);
}

export function* followActPostProducts() {
  yield takeLatest(SagaActionTypes.POST_PRODUCTS_SAGA, actPostProducts);
}
