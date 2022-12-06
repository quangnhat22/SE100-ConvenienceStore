import { all } from "redux-saga/effects";
import * as AuthenticationSaga from "./sagaActions/AuthenticationSaga";
import * as ProductsSaga from "./sagaActions/ProductsSaga";
import * as StaffSaga from "./sagaActions/StaffSaga";
import * as DeliveryNotesSaga from "./sagaActions/DeliveryNotesSaga";
import * as ProviderSaga from "./sagaActions/ProviderSaga";

export default function* rootSaga() {
  yield all([
    AuthenticationSaga.followActLoginWithEmailAndPassword(),
    ProductsSaga.followActGetListProducts(),
    ProductsSaga.followActPostProducts(),
    ProductsSaga.followActPutProducts(),
    ProductsSaga.followActDeleteProducts(),
    ProductsSaga.followActGetProductsById(),
    StaffSaga.followActGetListStaffs(),
    StaffSaga.followActPostStaff(),
    StaffSaga.followActPutStaff(),
    StaffSaga.followActDeleteStaff(),
    StaffSaga.followActGetStaffById(),
    DeliveryNotesSaga.followActGetDeliveryNotes(),
    DeliveryNotesSaga.followActPostDeliveryNotes(),
    DeliveryNotesSaga.followActDeleteDeliveryNotes(),
    DeliveryNotesSaga.followActGetDeliveryNoteById(),
    ProviderSaga.followActGetListProvider(),
    ProviderSaga.followActPostProvider(),
    ProviderSaga.followActPutProvider(),
    ProviderSaga.followActDeleteProvider(),
    ProviderSaga.followActGetProviderById(),
  ]);
}
