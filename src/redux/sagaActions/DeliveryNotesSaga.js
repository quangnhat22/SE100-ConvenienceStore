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

function* actPostDeliveryNotes(action) {
  try {
    let { newDeliveryNote } = action;
    yield put(deliveryNotesActions.getDeliveryNotesLoading());

    let res = yield call(() => DeliveryNotesService.postDeliveryNotes(newDeliveryNote));
    if (res.status === 201) {
      yield put({ type: SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actDeleteDeliveryNotes(action) {
  try {
    let { id } = action;
    yield put(deliveryNotesActions.getDeliveryNotesLoading());

    let res = yield call(() => DeliveryNotesService.deleteDeliveryNotesById(id));
    if (res.status === 200) {
      yield put({ type: SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actGetDeliveryNoteById(action) {
  try {
    let { id } = action;
    let res = yield call(() => DeliveryNotesService.getDeliveryNotesById(id));
    let {data, status} = res;
    if (status === 200) {
      yield put(deliveryNotesActions.getDeliveryNotesByIdSuccess({deliveryNote : data}));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetDeliveryNotes() {
  yield takeLatest(SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA, actGetDeliveryNotes);
}

export function* followActPostDeliveryNotes() {
  yield takeLatest(SagaActionTypes.POST_DELIVERY_NOTES_SAGA, actPostDeliveryNotes);
}

export function* followActDeleteDeliveryNotes() {
  yield takeLatest(SagaActionTypes.DELETE_DELIVERY_NOTES_SAGA, actDeleteDeliveryNotes);
}

export function* followActGetDeliveryNoteById() {
  yield takeLatest(SagaActionTypes.GET_DELIVERY_NOTES_ID_SAGA, actGetDeliveryNoteById);
}
