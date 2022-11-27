import {all} from "redux-saga/effects";
import * as AuthenticationSaga from './sagaActions/AuthenticationSaga';
import * as ProductsSaga from './sagaActions/ProductsSaga';

export default function * rootSaga() {
    yield all ([
        AuthenticationSaga.followActLoginWithEmailAndPassword(),
        ProductsSaga.followActGetListProducts(),
    ]);
}