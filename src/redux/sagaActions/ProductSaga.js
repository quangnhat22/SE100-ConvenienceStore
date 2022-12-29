import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { productActions } from "../reducer/ProductReducer";
import { ProductService } from "../../service/api/ProductApi";
import AlertCustom from "../../common/Notification/Alert";

function* actGetListProductItem() {
  try {
    yield put(productActions.getListProductLoading());

    let res = yield call(() => ProductService.getProduct());
    let { status, data } = res;
    if (status === 200) {
      yield put(productActions.getListProductSuccess({ listProduct: data }));
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
    yield put(productActions.getListProductLoading());
    let res = yield call(() => ProductService.getProductById(id));
    console.log(res);
    let { data, status } = res;
    if (status === 200) {
      yield put(productActions.getProductByIdSuccess({ productById: data }));
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
    console.log(res);

    if (res.status === 201) {
      yield put({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPutProductItem(action) {
  let { id, editProduct } = action;
  try {
    let res = yield call(() => ProductService.putProductById(id, editProduct));
    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Chỉnh sửa sản phẩm thành công" });
    } else {
      AlertCustom({ type: "error", title: "Chỉnh sửa sản phẩm thất bại" });
      //yield put(authActions.requestLogFailed());
    }
    yield put({
      type: SagaActionTypes.GET_PRODUCT_BY_ID_SAGA,
      id: id,
    });
  } catch (err) {
    //yield put(authActions.requestLogFailed());
    AlertCustom({ type: "error", title: "Chỉnh sửa sản phẩm thất bại" });
    yield put({
      type: SagaActionTypes.GET_PRODUCT_BY_ID_SAGA,
      id: id,
    });
  }
}

function* actDeleteProductItem(action) {
  try {
    let { id } = action;
    yield put(productActions.getListProductLoading());
    let res = yield call(() => ProductService.deleteProductById(id));
    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Xóa sản phẩm thành công" });
      yield put({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
    } else {
      AlertCustom({ type: "error", title: "Xóa sản phẩm thất bại" });
      //yield put(authActions.requestLogFailed());
    }
    yield put({
      type: SagaActionTypes.GET_LIST_PRODUCT_SAGA,
    });
  } catch (err) {
    if (err.response.data.statusCode === 409) {
      AlertCustom({
        type: "error",
        title: "Không thể xóa sản phẩm vì sản phẩm đã được bán",
      });
    } else {
      AlertCustom({ type: "error", title: err.message });
    }
    yield put({
      type: SagaActionTypes.GET_LIST_PRODUCT_SAGA,
    });
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetListProductItem() {
  yield takeLatest(
    SagaActionTypes.GET_LIST_PRODUCT_SAGA,
    actGetListProductItem
  );
}

export function* followActGetProductItemById() {
  yield takeLatest(
    SagaActionTypes.GET_PRODUCT_BY_ID_SAGA,
    actGetProductItemById
  );
}

export function* followActPostProductItem() {
  yield takeLatest(SagaActionTypes.POST_PRODUCT_ITEM_SAGA, actPostProductItem);
}

export function* followActPutProductItem() {
  yield takeLatest(SagaActionTypes.PUT_PRODUCT_ITEM_SAGA, actPutProductItem);
}

export function* followActDeleteProductItem() {
  yield takeLatest(
    SagaActionTypes.DELETE_PRODUCT_ITEM_SAGA,
    actDeleteProductItem
  );
}

// export function* followActGetProductsById() {
//   yield takeLatest(SagaActionTypes.GET_PRODUCTS_BY_ID_SAGA, actGetProductsById);
// }
