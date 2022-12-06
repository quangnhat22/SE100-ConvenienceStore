import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { UserService } from "../../service/api/AuthApi";
import { authActions } from "../reducer/authSlice";

function* actLoginWithEmailAndPassword(payload) {
  try {
    yield put(authActions.requestLog());

    const { username, password } = payload.data;

    let res = yield call(() => UserService.postAuthLogin(username, password));
    
    if (res.status === 201) {
      localStorage.setItem("access_token", res.data["access_token"]);
      localStorage.setItem("role", res.data["role"]);

      yield put(authActions.requestLogSuccess());
    } else {
    yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    yield put(authActions.requestLogFailed());
  }
}

export function* followActLoginWithEmailAndPassword() {
  yield takeLatest(
    SagaActionTypes.LOGIN_WITH_EMAIL_PASSWORD_SAGA,
    actLoginWithEmailAndPassword
  );
}
