import { call, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { UserService } from "../../service/api/AuthApi";


function* actLoginWithEmailAndPassword(payload) {
    try {
        const { username, password } = payload.data;
        console.log(username, password);
        let res = yield call(() => UserService.getAuthLogin(username, password));
        if (res) {
            console.log(res);
        }
    }
    catch (err) {
        console.log(err);
    }
}

export function* followActLoginWithEmailAndPassword() {
    yield takeLatest(SagaActionTypes.LOGIN_WITH_EMAIL_PASSWORD_SAGA, actLoginWithEmailAndPassword);
}