import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { providerActions } from "../reducer/ProviderReducer";
import { ProviderService } from "../../service/api/ProviderApi";

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
      yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPutProvider(action) {
  try {
    let { id, provider } = action;
    
    console.log(action);
    yield put(providerActions.getListProviderLoading());
    let res = yield call(() => ProviderService.putProviders(id, provider));
    if (res.status === 200) {
      yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actDeleteProvider(action) {
  try {
    let { id } = action;
    yield put(providerActions.getListProviderLoading());

    let res = yield call(() => ProviderService.deleteProvidersById(id));
    if (res.status === 200) {
      yield put({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actGetProviderById(action) {
  try {
    let { id } = action;
    let res = yield call(() => ProviderService.getProvidersById(id));
    let {data, status} = res;
    if (status === 200) {
      yield put(providerActions.getProviderByIdSuccess({provider : data}));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
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