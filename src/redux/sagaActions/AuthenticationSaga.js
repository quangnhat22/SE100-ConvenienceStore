import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { UserService } from "../../service/api/AuthApi";
import { authActions } from "../reducer/authSlice";
import AlertCustom from "../../common/Notification/Alert";

function* actLoginWithEmailAndPassword(payload) {
  try {
    yield put(authActions.requestLog());

    const { username, password } = payload.data;

    let res = yield call(() => UserService.postAuthLogin(username, password));
    console.log(res);
    if (res.status === 200) {
      localStorage.setItem("access_token", res.data["access_token"]);
      localStorage.setItem("role", res.data["user"]["role"]);
      localStorage.setItem("id", res.data["user"]["id"]);
      AlertCustom({ type: "success", title: "Đăng nhập thành công" });
      yield put(authActions.requestLogSuccess());
    } else {
      AlertCustom({
        type: "error",
        title: "Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản mật khẩu",
      });
      yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    AlertCustom({
      type: "error",
      title: "Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản mật khẩu",
    });
    yield put(authActions.requestLogFailed());
  }
}

export function* followActLoginWithEmailAndPassword() {
  yield takeLatest(
    SagaActionTypes.LOGIN_WITH_EMAIL_PASSWORD_SAGA,
    actLoginWithEmailAndPassword
  );
}
