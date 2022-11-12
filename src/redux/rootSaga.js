import {all} from "redux-saga/effects";
import * as AuthenticationSaga from './sagaActions/AuthenticationSaga';

export default function * rootSaga() {
    yield all ([
        AuthenticationSaga.followActLoginWithEmailAndPassword(),
    ]);
}