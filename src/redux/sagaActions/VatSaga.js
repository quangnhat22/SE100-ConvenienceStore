import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { vatActions } from "../reducer/VatReducer";
import { modalActions } from "../reducer/ModalReducer";
import { VatService } from "../../service/api/VatApi";
import AlertCustom from "../../common/Notification/Alert";

function* actGetVat() {
  try {
    yield put(vatActions.getVatLoading());

    let res = yield call(() => VatService.getVat());
    let { status, data } = res;
    if (status === 200) {
      yield put(vatActions.getVatSuccess({ vat: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPutVat(action) {
  try {
    let { val } = action;
    yield put(vatActions.getVatLoading());

    let res = yield call(() => VatService.putVat(val));
    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Chỉnh sửa VAT thành công" });

      yield put(vatActions.getVatSuccess({ vat: res.data }));
      yield put(modalActions.hideModal());

    } else {
      AlertCustom({ type: "error", title: "Chỉnh sửa VAT thất bại" });
    }
  } catch (err) {
    AlertCustom({ type: "error", title: err.message });
  }
}

export function* followActGetVat() {
  yield takeLatest(SagaActionTypes.GET_VAT_SAGA, actGetVat);
}

export function* followActPutVat() {
  yield takeLatest(SagaActionTypes.PUT_VAT_SAGA, actPutVat);
}
