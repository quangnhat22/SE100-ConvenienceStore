import {all} from "redux-saga/effects";
import * as AuthenticationSaga from './sagaActions/AuthenticationSaga';
import * as ProductsSaga from './sagaActions/ProductsSaga';
import * as StaffSaga from './sagaActions/StaffSaga';
import * as DeliveryNotesSaga from './sagaActions/DeliveryNotesSaga';

export default function * rootSaga() {
    yield all ([
        AuthenticationSaga.followActLoginWithEmailAndPassword(),
        ProductsSaga.followActGetListProducts(),
        ProductsSaga.followActPostProducts(),
        StaffSaga.followActGetListStaffs(),
        StaffSaga.followActPostStaff(),
        DeliveryNotesSaga.followActGetDeliveryNotes(),
        DeliveryNotesSaga.followActPostDeliveryNotes(),
        DeliveryNotesSaga.followActDeleteDeliveryNotes(),
    ]);
}