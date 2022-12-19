import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productActions } from "../reducer/ProductReducer";
import { ProductService } from "../../service/api/ProductApi";

function* actGetListProductItem() {
  try {
    yield put(productActions.getListProductLoading());

    let res = yield call(() => ProductService.getProduct());
    let {status, data} = res;
    if (status === 200) {
      yield put(
        productActions.getListProductSuccess({ products: data })
      );
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actGetProductItemById(action) {
  try {
    let { id } = action;
    let res = yield call(() => ProductService.getProductById(id));
    let {data, status} = res;
    if (status === 200) {
      yield put(productActions.getProductByIdSuccess({provider : data}));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostProductItem(action) {
  try {
    let { newProduct } = action;
    yield put(productActions.getListProductLoading());
    let res = yield call(() => ProductService.postProduct(newProduct));
    if (res.status === 201) {
     yield put({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actDeleteProductItem(action) {
  try {
    let { id } = action;
    yield put(productActions.getListProductLoading());

    let res = yield call(() => ProductService.deleteProductById(id));
    if (res.status === 200) {
      yield put({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetListProductItem() {
  yield takeLatest(SagaActionTypes.GET_LIST_PRODUCT_SAGA, actGetListProductItem);
}

export function* followActGetProductItemById() {
  yield takeLatest(SagaActionTypes.GET_LIST_PRODUCT_SAGA, actGetProductItemById);
}

export function* followActPostProductItem() {
  yield takeLatest(SagaActionTypes.POST_PRODUCT_ITEM_SAGA, actPostProductItem);
}

export function* followActDeleteProductItem() {
  yield takeLatest(SagaActionTypes.DELETE_PRODUCT_ITEM_SAGA, actDeleteProductItem);
}

// export function* followActGetProductsById() {
//   yield takeLatest(SagaActionTypes.GET_PRODUCTS_BY_ID_SAGA, actGetProductsById);
// }
