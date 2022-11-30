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

function* actPostStaffs(newStaffs) {
  try {
    let { values } = newStaffs;
    // yield put(staffActions.getListStaffsInLoading());
    console.log(values);
    let res = yield call(() => UserService.postUsers(values));
    console.log("pót", res);
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
// export function* followActPostStaffs() {
//   yield takeLatest(
//     SagaActionTypes.POST_Staffs_SAGA,
//     actPostStaffs
//   );
// }
