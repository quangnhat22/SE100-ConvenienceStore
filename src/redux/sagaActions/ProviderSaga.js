import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { providerActions } from "../reducer/ProviderReducer";
import { ProviderService } from "../../service/api/ProviderApi";
import { modalActions } from "../reducer/ModalReducer";
import AlertCustom from "../../common/Notification/Alert";

function* actGetListProvider() {
  try {
    yield put(providerActions.getListProviderLoading());

    let res = yield call(() => ProviderService.getProviders());

    console.log(res);
    let { status, data } = res;
    if (status === 200) {
      yield put(providerActions.getListProviderSuccess({ providers: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostProvider(action) {
  try {
    let { newProvider } = action;
    yield put(providerActions.getListProviderLoading());

    let res = yield call(() => ProviderService.postProviders(newProvider));
    if (res.status === 201) {
      AlertCustom({ type: "success", title: "Thêm nhà cung cấp thành công" });
      yield put(modalActions.hideModal());
    } else {
      AlertCustom({ type: "error", title: "Thêm nhà cung cấp thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
  } catch (err) {
    AlertCustom({ type: "error", title: err });
    yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
  }
}

function* actPutProvider(action) {
  try {
    let { id, provider } = action;

    console.log(action);
    yield put(providerActions.getListProviderLoading());
    let res = yield call(() => ProviderService.putProviders(id, provider));
    if (res.status === 200) {
      AlertCustom({
        type: "success",
        title: "Chỉnh sửa nhà cung cấp thành công",
      });
      yield put(modalActions.hideModal());
    } else {
      AlertCustom({ type: "error", title: "Chỉnh sửa nhà cung cấp thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
  } catch (err) {
    AlertCustom({ type: "error", title: err });
    yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
  }
}

function* actDeleteProvider(action) {
  try {
    let { id } = action;
    yield put(providerActions.getListProviderLoading());

    let res = yield call(() => ProviderService.deleteProvidersById(id));
    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Xóa nhà cung cấp thành công" });
    } else {
      AlertCustom({ type: "error", title: "Xóa nhà cung cấp thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
  } catch (err) {
    AlertCustom({ type: "error", title: err });
    yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
  }
}

function* actGetProviderById(action) {
  try {
    let { id } = action;
    let res = yield call(() => ProviderService.getProvidersById(id));
    let { data, status } = res;
    if (status === 200) {
      yield put(providerActions.getProviderByIdSuccess({ provider: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actGetListProductOfProvider(action) {
  try {
    let {providerId} = action;

    let res = yield call(() => ProviderService.getProductsOfProvidersById(providerId));

    let { status, data } = res;

    if (status === 200) {
      yield put(providerActions.getProductOfProviderSuccess({ productOfProvider: data }));

    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actAddProductOfProvider(action) {
  try {
    let { providerId, listIdProduct } = action;

    yield put(providerActions.getProductOfProviderLoading());

    let res = yield call(() => ProviderService.addProductsOfProvidersById(providerId, listIdProduct));

    if (res.status === 201) {
      AlertCustom({ type: "success", title: "Thêm sản phẩm nhà cung cấp thành công" });
      yield put(modalActions.hideModal());

    } else {
      AlertCustom({ type: "error", title: "Thêm sản phẩm nhà cung cấp thất bại" });

    }
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCT_PROVIDER_ID_SAGA });

  } catch (err) {
    AlertCustom({ type: "error", title: err });
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCT_PROVIDER_ID_SAGA  });
  }
}

function* actRemoveProductOfProvider(action) {
  try {
    let { providerId, listIdProduct } = action;

    yield put(providerActions.getProductOfProviderLoading());

    let res = yield call(() => ProviderService.removeProductsOfProvidersById(providerId, listIdProduct));

    if (res.status === 201) {
      AlertCustom({ type: "success", title: "Xoá sản phẩm nhà cung cấp thành công" });
      yield put(modalActions.hideModal());
      
    } else {
      AlertCustom({ type: "error", title: "Xoá sản phẩm nhà cung cấp thất bại" });

    }
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCT_PROVIDER_ID_SAGA });
    
  } catch (err) {
    AlertCustom({ type: "error", title: err });
    yield put({ type: SagaActionTypes.GET_LIST_PRODUCT_PROVIDER_ID_SAGA });
  }
}

export function* followActGetListProvider() {
  yield takeLatest(SagaActionTypes.GET_LIST_PROVIDER_SAGA, actGetListProvider);
}

export function* followActPostProvider() {
  yield takeLatest(SagaActionTypes.POST_PROVIDER_SAGA, actPostProvider);
}

export function* followActPutProvider() {
  yield takeLatest(SagaActionTypes.PUT_PROVIDER_SAGA, actPutProvider);
}

export function* followActDeleteProvider() {
  yield takeLatest(SagaActionTypes.DELETE_PROVIDER_SAGA, actDeleteProvider);
}

export function* followActGetProviderById() {
  yield takeLatest(SagaActionTypes.GET_PROVIDER_BY_ID_SAGA, actGetProviderById);
}

export function* followActGetListProductOfProvider() {
  yield takeLatest(SagaActionTypes.GET_LIST_PRODUCT_PROVIDER_ID_SAGA, actGetListProductOfProvider);
}

export function* followActAddProductOfProvider() {
  yield takeLatest(SagaActionTypes.ADD_PRODUCT_PROVIDER_ID_SAGA, actAddProductOfProvider);
}

export function* followActRemoveProductOfProvider() {
  yield takeLatest(SagaActionTypes.REMOVE_PRODUCT_PROVIDER_ID_SAGA, actRemoveProductOfProvider);
}