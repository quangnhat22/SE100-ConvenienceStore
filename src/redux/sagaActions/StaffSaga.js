import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { staffActions } from "../reducer/StaffReducer";
import { modalActions } from "../reducer/ModalReducer";
import { UserService } from "../../service/api/UserApi";
import AlertCustom from "../../common/Notification/Alert";

function* actGetListStaffs() {
  try {
    yield put(staffActions.getListStaffsInLoading());

    let res = yield call(() => UserService.getUsers());
    let { status, data } = res;
    if (status === 200) {
      yield put(staffActions.getListStaffsSuccess({ staffs: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostStaff(action) {
  try {
    let { newStaff } = action;
    yield put(staffActions.getListStaffsInLoading());
    let res = yield call(() => UserService.postUsers(newStaff));
    if (res.status === 201) {
      AlertCustom({ type: "success", title: "Thêm nhân viên thành công" });
      yield put(modalActions.hideModal());
    } else {
      AlertCustom({ type: "error", title: "Thêm nhân viên thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
  } catch (err) {
    if (err.response.data.statusCode === 409) {
      AlertCustom({ type: "error", title: "Email đã được sử dụng" });
    } else {
      AlertCustom({ type: "error", title: err.message });
    }
    yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
  }
}

function* actPutStaff(action) {
  let { id, staff } = action;
  try {
    yield put(staffActions.getListStaffsInLoading());
    let res = yield call(() => UserService.putUsersById(id, staff));
    console.log(res);
    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Chỉnh sửa nhân viên thành công" });
      yield put(staffActions.getListStaffByIdSuccess({ staff: res.data }));
      yield put(modalActions.hideModal());
    } else {
      AlertCustom({ type: "error", title: "Chỉnh sửa nhân viên thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    yield put({ type: SagaActionTypes.GET_USER_BY_ID_SAGA, id: id });
    yield put({
      type: SagaActionTypes.GET_USER_LOGIN_SAGA,
      id: localStorage.getItem("id"),
    });
  } catch (err) {
    AlertCustom({ type: "error", title: err.message });
    yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    yield put({ type: SagaActionTypes.GET_USER_BY_ID_SAGA, id: id });
    yield put({
      type: SagaActionTypes.GET_USER_LOGIN_SAGA,
      id: localStorage.getItem("id"),
    });
  }
}

function* actDeleteStaff(action) {
  try {
    let { id } = action;
    yield put(staffActions.getListStaffsInLoading());
    let res = yield call(() => UserService.deleteUserById(id));
    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Xóa nhân viên thành công" });
    } else {
      AlertCustom({ type: "error", title: "Xóa nhân viên thất bại" });
    }
    yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
  } catch (err) {
    if (err.response.data.statusCode === 409) {
      AlertCustom({
        type: "error",
        title: "Không thể xóa nhân viên này vì đã thực hiện thanh toán",
      });
    } else {
      AlertCustom({ type: "error", title: err.message });
    }
    yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
  }
}

function* actGetStaffById(action) {
  try {
    yield put(staffActions.getListStaffsInLoading());
    let { id } = action;
    let res = yield call(() => UserService.getUsersById(id));
    let { data, status } = res;

    if (status === 200) {
      yield put(staffActions.getListStaffByIdSuccess({ staff: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actGetStaffLoginById(action) {
  try {
    yield put(staffActions.getListStaffsInLoading());
    let { id } = action;
    let res = yield call(() => UserService.getUsersById(id));
    let { data, status } = res;

    if (status === 200) {
      yield put(staffActions.getStaffLoginByIdSuccess({ staffLogin: data }));
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
  yield takeLatest(SagaActionTypes.POST_USER_SAGA, actPostStaff);
}

export function* followActPutStaff() {
  yield takeLatest(SagaActionTypes.PUT_USER_SAGA, actPutStaff);
}

export function* followActDeleteStaff() {
  yield takeLatest(SagaActionTypes.DELETE_USER_SAGA, actDeleteStaff);
}

export function* followActGetStaffById() {
  yield takeLatest(SagaActionTypes.GET_USER_BY_ID_SAGA, actGetStaffById);
}

export function* followActGetStaffLoginById() {
  yield takeLatest(SagaActionTypes.GET_USER_LOGIN_SAGA, actGetStaffLoginById);
}
