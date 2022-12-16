import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { staffActions } from "../reducer/StaffReducer";
import { UserService } from "../../service/api/UserApi";

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
      yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPutStaff(action) {
  try {
    let { id, staff } = action;
    console.log(action);
    yield put(staffActions.getListStaffsInLoading());
    let res = yield call(() => UserService.putUsersById(id, staff));
    console.log(res);
    if (res.status === 200) {
      yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actDeleteStaff(action) {
  try {
    let { id } = action;
    yield put(staffActions.getListStaffsInLoading());
    let res = yield call(() => UserService.deleteUserById(id));
    if (res.status === 200) {
      yield put({ type: SagaActionTypes.GET_LIST_USER_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actGetStaffById(action) {
  try {
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
