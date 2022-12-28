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

function* actForgotPassword(payload) {
  let {email} = payload.data;
  try {
    let res = yield call(() => UserService.forgotPassword(email));

    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Gửi email khôi phục mật khẩu thành công! Vui lòng check email" });
    } else {
      AlertCustom({
        type: "error",
        title: "Gửi email khôi phục mật khẩu thất bại! Vui lòng thử lại.",
      });
    }
  } catch (err) {
    AlertCustom({
      type: "error",
      title: "Gửi email khôi phục mật khẩu thất bại! Vui lòng thử lại.",
    });
  }
}

function* actResetPassword(payload) {
  let {token, email} = payload.data;
  try {
    let res = yield call(() => UserService.resetPassword(token, email));

    if (res.status === 200) {
      AlertCustom({ type: "success", title: "Khôi phục mật khẩu mới thành công" });
    } else {
      AlertCustom({
        type: "error",
        title: "Khôi phục mật khẩu mới thất bại",
      });
    }
  } catch (err) {
    AlertCustom({
      type: "error",
      title: "Khôi phục mật khẩu mới thất bại",
    });
  }
}

export function* followActLoginWithEmailAndPassword() {
  yield takeLatest(
    SagaActionTypes.LOGIN_WITH_EMAIL_PASSWORD_SAGA,
    actLoginWithEmailAndPassword
  )
}

export function* followActForgotPassword() {
  yield takeLatest(
    SagaActionTypes.FORGOT_PASSWORD_SAGA,
    actForgotPassword
  );
}

export function* followActResetPassword() {
  yield takeLatest(
    SagaActionTypes.RESET_PASSWORD_SAGA,
    actResetPassword
  );
}