import {all} from "redux-saga/effects";

export default function * rootSaga() {
    yield all ([
        // AutheticationSaga.followActLoginWithGoogle(),
        // AutheticationSaga.followActLoginWithEmailAndPassword(),
        // AutheticationSaga.followActSignUpWithEmailAndPassword(),
        // AutheticationSaga.followActResetPassword(),
        // AutheticationSaga.followActChangeUserPassword(),
    ]);
}