import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { deliveryNotesActions } from "../reducer/DeliveryNotesReducer";
import { DeliveryNotesService } from "../../service/api/DeliveryNotesApi";

function* actGetDeliveryNotes() {
  try {
    yield put(deliveryNotesActions.getDeliveryNotesLoading());

    let res = yield call(() => DeliveryNotesService.getDeliveryNotes());
    let { status, data } = res;
    if (status === 200) {
      yield put(
        deliveryNotesActions.getDeliveryNotesSuccess({ deliveryNotes: data })
      );
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostDeliveryNotes(newDeliveryNotes) {
  try {
    let { values } = newDeliveryNotes;
    yield put(deliveryNotesActions.getDeliveryNotesLoading());

    let res = yield call(() => DeliveryNotesService.postDeliveryNotes(values));
    if (res.status === 201) {
      yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPutDeliveryNotes(newDeliveryNotes) {
  try {
    let { values } = newDeliveryNotes;
    yield put(deliveryNotesActions.getDeliveryNotesLoading());

    let res = yield call(() => DeliveryNotesService.postDeliveryNotes(values));
    if (res.status === 201) {
      yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actDeleteDeliveryNotes(newDeliveryNotes) {
  try {
    let { values } = newDeliveryNotes;
    yield put(deliveryNotesActions.getDeliveryNotesLoading());

    let res = yield call(() => DeliveryNotesService.postDeliveryNotes(values));
    if (res.status === 201) {
      yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetListStaffs() {
  yield takeLatest(SagaActionTypes.GET_LIST_USER_SAGA, actGetListStaffs);
}

export function* followActPostStaff() {
  yield takeLatest(SagaActionTypes.POST_USER_SAGA, actPostStaffs);
}
