import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productItemsQuantityActions } from "../reducer/ProductItemQuantityReducer";
import { ProductItemQuantityService } from "../../service/api/ProductItemQuantityApi";
import Swal from "sweetalert2";

function* actGetListProductItemsQuantity() {
  try {
    yield put(productItemsQuantityActions.getListProductsLoading());

    let res = yield call(() =>
      ProductItemQuantityService.getProductItemQuantity()
    );
    let { status, data } = res;
    console.log(res);
    if (status === 200) {
      yield put(
        productItemsQuantityActions.getProductItemsQuantitySuccess({
          productItemsQuantity: data,
        })
      );

       Swal.fire({
      width: "400",
      height: "100",
      backdrop: "none",
      icon: "success",
      title: "Giá trị tối thiểu không được phép lớn hơn giá trị max",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostProductItemsQuantity(action) {
  try {
    let { newProductItemQuantityState } = action;
    yield put(productItemsQuantityActions.getProductItemsQuantityLoading());
    let res = yield call(() =>
      ProductItemQuantityService.postProductItemQuantity(
        newProductItemQuantityState
      )
    );
    if (res.status === 201) {
      yield put({
        type: SagaActionTypes.GET_LIST_PRODUCTS_ITEM_QUANTITY_RULE_SAGA,
      });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPutProductItemsQuantity(action) {
  try {
    let { id, productItemQuantityState } = action;

    yield put(productItemsQuantityActions.getProductItemsQuantityLoading());
    let res = yield call(() =>
      ProductItemQuantityService.putProductItemQuantityById(
        id,
        productItemQuantityState
      )
    );
    if (res.status === 200) {
      yield put({
        type: SagaActionTypes.GET_LIST_PRODUCTS_ITEM_QUANTITY_RULE_SAGA,
      });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actDeleteProductItemsQuantity(action) {
  try {
    let { id } = action;
    yield put(productItemsQuantityActions.getProductItemsQuantityLoading());

    let res = yield call(() =>
      ProductItemQuantityService.deleteProductItemQuantityById(id)
    );
    if (res.status === 200) {
      yield put({
        type: SagaActionTypes.GET_LIST_PRODUCTS_ITEM_QUANTITY_RULE_SAGA,
      });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actProductItemQuantityById(action) {
  try {
    let { id } = action;
    let res = yield call(() =>
      ProductItemQuantityService.getProductItemQuantityById(id)
    );
    let { data, status } = res;
    if (status === 200) {
      yield put(
        productItemsQuantityActions.getProductItemQuantityByIdSuccess({
          productItemQuantity: data,
        })
      );
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetListProductItemsQuantity() {
  yield takeLatest(
    SagaActionTypes.GET_LIST_PRODUCTS_ITEM_QUANTITY_RULE_SAGA,
    actGetListProductItemsQuantity
  );
}

export function* followActPostProductItemsQuantity() {
  yield takeLatest(
    SagaActionTypes.POST_PRODUCT_ITEM_QUANTITY_RULE_SAGA,
    actPostProductItemsQuantity
  );
}

export function* followActPutProductItemsQuantity() {
  yield takeLatest(
    SagaActionTypes.PUT_PRODUCT_ITEM_QUANTITY_RULE_SAGA,
    actPutProductItemsQuantity
  );
}

export function* followActDeleteProductItemsQuantity() {
  yield takeLatest(
    SagaActionTypes.DELETE_PRODUCT_ITEM_QUANTITY_RULE_SAGA,
    actDeleteProductItemsQuantity
  );
}

export function* followActProductItemQuantityById() {
  yield takeLatest(
    SagaActionTypes.GET_PRODUCTS_ITEM_QUANTITY_RULE_BY_ID_SAGA,
    actProductItemQuantityById
  );
}
