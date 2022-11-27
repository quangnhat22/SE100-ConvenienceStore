import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productActions } from "../reducer/ProductReducer";
import { ProductService } from "../../service/api/ProductApi";

function* actGetListProducts() {
  try {
    yield put(productActions.getListProductLoading());

    let res = yield call(() => ProductService.getProduct());
    let listProducts = res.data;
    console.log(res);
    if (res.status === 200) {
      yield put(productActions.getListProductSuccess({products: listProducts}));
    } else {
    //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetListProducts() {
  yield takeLatest(
    SagaActionTypes.GET_LIST_PRODUCT_SAGA,
    actGetListProducts
  );
}
