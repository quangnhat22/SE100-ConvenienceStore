import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productItemsExpireActions } from "../reducer/ProductExpireReducer";
import { ProductItemExpireService } from "../../service/api/ProductItemExpireApi";
import { modalActions } from "../reducer/ModalReducer";
import AlertCustom from "../../common/Notification/Alert";

function* actGetListProductItemsExpire() {
  try {
    yield put(productItemsExpireActions.getProductItemsExpireLoading());

    let res = yield call(() => ProductItemExpireService.getProductItemExpire());
    let { status, data } = res;
    if (status === 200) {
      yield put(
        productItemsExpireActions.getProductItemsExpireSuccess({
          productItemsExpire: data,
        })
      );
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostProductItemsExpire(action) {
  try {
    let { newProductItemExpireState } = action;
    yield put(productItemsExpireActions.getProductItemsExpireLoading());
    let res = yield call(() =>
      ProductItemExpireService.postProductItemExpire(newProductItemExpireState)
    );
    if (res.status === 201) {
      AlertCustom({ type: "success", title: "Thêm nhà quy định thành công" });
      yield put(modalActions.hideModal());
    } else {
      AlertCustom({ type: "error", title: "Thêm nhà quy định thất bại" });
    }
    yield put({
      type: SagaActionTypes.GET_PRODUCT_EXPIRE_SAGA,
    });
  } catch (err) {
    AlertCustom({ type: "error", title: err.message });
    yield put({ type: SagaActionTypes.GET_PRODUCT_EXPIRE_SAGA });
  }
}

function* actPutProductItemsExpire(action) {
  try {
    let { id, productItemQuantityState } = action;

    yield put(productItemsExpireActions.getProductItemsExpireLoading());
    let res = yield call(() =>
      ProductItemExpireService.putProductItemExpireById(
        id,
        productItemQuantityState
      )
    );
    if (res.status === 200) {
      AlertCustom({
        type: "success",
        title: "Chỉnh sửa trạng thái thành công",
      });
    } else {
      AlertCustom({ type: "error", title: "Chỉnh sửa trạng thái thất bại" });
    }
    yield put({
      type: SagaActionTypes.GET_PRODUCT_EXPIRE_BY_ID_SAGA,
      id: id,
    });
  } catch (err) {
    AlertCustom({ type: "error", title: err.message });
  }
}

function* actDeleteProductItemsExpire(action) {
  try {
    let { id } = action;
    yield put(productItemsExpireActions.getProductItemsExpireLoading());

    let res = yield call(() =>
      ProductItemExpireService.deleteProductItemExpireById(id)
    );
    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Xóa trạng thái thành công" });
    } else {
      AlertCustom({ type: "error", title: "Xóa trạng thái thất bại" });
    }
    yield put({
      type: SagaActionTypes.GET_PRODUCT_EXPIRE_SAGA,
    });
  } catch (err) {
    AlertCustom({ type: "error", title: err.message });
    yield put({ type: SagaActionTypes.GET_PRODUCT_EXPIRE_SAGA });
  }
}

function* actGetProductItemExpireById(action) {
  try {
    let { id } = action;
    let res = yield call(() =>
      ProductItemExpireService.getProductItemExpireById(id)
    );
    let { data, status } = res;
    if (status === 200) {
      yield put(
        productItemsExpireActions.getProductItemExpireByIdSuccess({
          productItemExpire: data,
        })
      );
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetListProductItemsExpire() {
  yield takeLatest(
    SagaActionTypes.GET_PRODUCT_EXPIRE_SAGA,
    actGetListProductItemsExpire
  );
}

export function* followActPostProductItemsExpire() {
  yield takeLatest(
    SagaActionTypes.POST_PRODUCT_EXPIRE_SAGA,
    actPostProductItemsExpire
  );
}

export function* followActPutProductItemsExpire() {
  yield takeLatest(
    SagaActionTypes.PUT_PRODUCT_EXPIRE_SAGA,
    actPutProductItemsExpire
  );
}

export function* followActDeleteProductItemsExpire() {
  yield takeLatest(
    SagaActionTypes.DELETE_PRODUCT_EXPIRE_SAGA,
    actDeleteProductItemsExpire
  );
}

export function* followActProductItemExpireById() {
  yield takeLatest(
    SagaActionTypes.GET_PRODUCT_EXPIRE_BY_ID_SAGA,
    actGetProductItemExpireById
  );
}
