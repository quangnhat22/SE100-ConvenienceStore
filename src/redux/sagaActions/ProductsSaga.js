import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productsActions } from "../reducer/ProductsReducer";
import { ProductsService } from "../../service/api/ProductsApi";
import { modalActions } from "../reducer/ModalReducer";
import AlertCustom from "../../common/Notification/Alert";

function* actGetListProducts() {
  try {
    yield put(productsActions.getListProductsLoading());

    let res = yield call(() => ProductsService.getProducts());
    let { status, data } = res;
    if (status === 200) {
      yield put(productsActions.getListProductsSuccess({ products: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostProducts(action) {
  try {
    let { newProducts } = action;
    yield put(productsActions.getListProductsLoading());
    let res = yield call(() => ProductsService.postProducts(newProducts));
    if (res.status === 201) {
      AlertCustom({ type: "success", title: "Thêm dòng sản phẩm thành công" });
      yield put(modalActions.hideModal());
    } else {
      AlertCustom({ type: "error", title: "Thêm dòng sản phẩm thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  } catch (err) {
    AlertCustom({ type: "error", title: err.message });
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  }
}

function* actPutProducts(action) {
  try {
    let { id, products } = action;

    yield put(productsActions.getListProductsLoading());
    let res = yield call(() => ProductsService.putProductsById(id, products));
    if (res.status === 200) {
      AlertCustom({
        type: "success",
        title: "Chỉnh sửa dòng sản phẩm thành công",
      });
      yield put(modalActions.hideModal());
    } else {
      AlertCustom({ type: "error", title: "Chỉnh sửa dòng sản phẩm thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  } catch (err) {
    AlertCustom({ type: "error", title: err.message });
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  }
}

function* actDeleteProducts(action) {
  let { id } = action;
  try {
    yield put(productsActions.getListProductsLoading());

    let res = yield call(() => ProductsService.deleteProductsById(id));
    if (res.status === 200) {
      AlertCustom({
        type: "success",
        title: "Xóa dòng sản phẩm thành công",
      });
    } else {
      AlertCustom({ type: "error", title: "Xóa dòng sản phẩm thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  } catch (err) {
    if (err.response.data.statusCode === 409) {
      AlertCustom({
        type: "error",
        title: "Không thể xóa dòng sản phẩm vì đã được dùng",
      });
    } else {
      AlertCustom({ type: "error", title: err.message });
    }
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  }
}

function* actGetProductsById(action) {
  try {
    let { id } = action;
    let res = yield call(() => ProductsService.getProductsById(id));
    let { data, status } = res;
    if (status === 200) {
      yield put(productsActions.getProductsByIdSuccess({ productsById: data }));
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

export function* followActPutProducts() {
  yield takeLatest(SagaActionTypes.PUT_PRODUCTS_SAGA, actPutProducts);
}

export function* followActDeleteProducts() {
  yield takeLatest(SagaActionTypes.DELETE_PRODUCTS_SAGA, actDeleteProducts);
}

export function* followActGetProductsById() {
  yield takeLatest(SagaActionTypes.GET_PRODUCTS_BY_ID_SAGA, actGetProductsById);
}
