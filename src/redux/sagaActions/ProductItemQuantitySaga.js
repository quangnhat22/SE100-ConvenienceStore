import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productItemsQuantityActions } from "../reducer/ProductItemQuantityReducer";
import { ProductItemQuantityService } from "../../service/api/ProductItemQuantityApi";
import { modalActions } from "../reducer/ModalReducer";
import Swal from "sweetalert2";

function* actGetListProductItemsQuantity() {
  try {
    yield put(productItemsQuantityActions.getProductItemsQuantityLoading());
    let res = yield call(() => ProductItemQuantityService.getProductItemQuantity());
    let { status, data } = res;
    if (status === 200) {
      yield put(
        productItemsQuantityActions.getProductItemsQuantitySuccess({
          productItemsQuantity: data,
        })
      );
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
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        icon: "success",
        title: "Thêm giá trị mới thành công",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      yield put({
        type: SagaActionTypes.GET_LIST_PRODUCTS_ITEM_QUANTITY_RULE_SAGA,
      });
      yield put(modalActions.hideModal());
    } else {
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        icon: "error",
        title: "Thêm giá trị mới thất bại",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      yield put(productItemsQuantityActions.getProductItemsQuantityFail());
    }
  } catch (err) {
    Swal.fire({
      width: "400",
      height: "100",
      backdrop: "none",
      icon: "error",
      title: err,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    yield put(productItemsQuantityActions.getProductItemsQuantityFail());
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
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        icon: "success",
        title: "Cập nhập giá trị thành công",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      yield put(modalActions.hideModal());
    } else {
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        icon: "error",
        title: "Cập nhập giá trị thất bại",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    }
  } catch (err) {
    Swal.fire({
      width: "400",
      height: "100",
      backdrop: "none",
      icon: "error",
      title: err,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
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
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        icon: "success",
        title: "Xoá giá trị thành công",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        width: "400",
        height: "100",
        backdrop: "none",
        icon: "error",
        title: "Xoá giá trị thất bại",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    }
  } catch (err) {
    Swal.fire({
      width: "400",
      height: "100",
      backdrop: "none",
      icon: "error",
      title: err,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
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
