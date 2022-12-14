import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { deliveryNotesActions } from "../reducer/DeliveryNotesReducer";
import { DeliveryNotesService } from "../../service/api/DeliveryNotesApi";
import { modalActions } from "../reducer/ModalReducer";
import AlertCustom from "../../common/Notification/Alert";

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

    let res = yield call(() =>
      DeliveryNotesService.postDeliveryNotes(newDeliveryNote)
    );
    if (res.status === 201) {
      AlertCustom({
        type: "success",
        title: "Thêm phiếu nhập hàng thành công",
      });
      yield put(modalActions.hideModal());
    } else {
      AlertCustom({ type: "error", title: "Thêm phiếu nhập hàng thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA });
  } catch (err) {
    AlertCustom({ type: "error", title: err.message });
    yield put({ type: SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA });
  }
}

function* actDeleteDeliveryNotes(action) {
  try {
    let { id } = action;
    yield put(deliveryNotesActions.getDeliveryNotesLoading());

    let res = yield call(() =>
      DeliveryNotesService.deleteDeliveryNotesById(id)
    );
    if (res.status === 200) {
      AlertCustom({
        type: "success",
        title: "Xóa phiếu nhập hàng thành công",
      });
    } else {
      AlertCustom({ type: "error", title: "Xóa phiếu nhập hàng thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA });
  } catch (err) {
    if (err.response.data.statusCode === 409) {
      AlertCustom({
        type: "error",
        title:
          "Không thể xóa phiếu nhập hàng vì sản phẩm của phiếu đã được dùng",
      });
    } else {
      AlertCustom({ type: "error", title: err.message });
    }
    yield put({ type: SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA });
  }
}

function* actGetDeliveryNoteById(action) {
  try {
    let { id } = action;
    yield put(deliveryNotesActions.getDeliveryNotesLoading());
    let res = yield call(() => DeliveryNotesService.getDeliveryNotesById(id));
    let { data, status } = res;
    if (status === 200) {
      yield put(
        deliveryNotesActions.getDeliveryNotesByIdSuccess({ deliveryNote: data })
      );
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetDeliveryNotes() {
  yield takeLatest(
    SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA,
    actGetDeliveryNotes
  );
}

export function* followActPostDeliveryNotes() {
  yield takeLatest(
    SagaActionTypes.POST_DELIVERY_NOTES_SAGA,
    actPostDeliveryNotes
  );
}

export function* followActDeleteDeliveryNotes() {
  yield takeLatest(
    SagaActionTypes.DELETE_DELIVERY_NOTES_SAGA,
    actDeleteDeliveryNotes
  );
}

export function* followActGetDeliveryNoteById() {
  yield takeLatest(
    SagaActionTypes.GET_DELIVERY_NOTES_ID_SAGA,
    actGetDeliveryNoteById
  );
}
