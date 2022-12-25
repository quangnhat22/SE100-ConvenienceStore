import { all } from "redux-saga/effects";
import * as AuthenticationSaga from "./sagaActions/AuthenticationSaga";
import * as ProductsSaga from "./sagaActions/ProductsSaga";
import * as StaffSaga from "./sagaActions/StaffSaga";
import * as DeliveryNotesSaga from "./sagaActions/DeliveryNotesSaga";
import * as ProviderSaga from "./sagaActions/ProviderSaga";
import * as ProductSaga from "./sagaActions/ProductSaga";
import * as ProductItemQuantityStateSaga from "./sagaActions/ProductItemQuantitySaga";
import * as ReportSaga from "./sagaActions/ReportSaga";
import * as InvoiceSaga from "./sagaActions/InvoiceSaga";
import * as ProductExpireSaga from "./sagaActions/ProductExpireSaga";

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
    ProviderSaga.followActGetListProductOfProvider(),
    ProviderSaga.followActAddProductOfProvider(),
    ProviderSaga.followActRemoveProductOfProvider(),
    ProductItemQuantityStateSaga.followActGetListProductItemsQuantity(),
    ProductItemQuantityStateSaga.followActPostProductItemsQuantity(),
    ProductItemQuantityStateSaga.followActPutProductItemsQuantity(),
    ProductItemQuantityStateSaga.followActDeleteProductItemsQuantity(),
    ProductItemQuantityStateSaga.followActProductItemQuantityById(),
    ReportSaga.followActGetListReportWeek(),
    ReportSaga.followActGetListReportMonth(),
    ReportSaga.followActGetListReportYear(),
    ProductSaga.followActGetListProductItem(),
    ProductSaga.followActGetProductItemById(),
    ProductSaga.followActDeleteProductItem(),
    ProductSaga.followActPostProductItem(),
    InvoiceSaga.followActGetListInvoice(),
    InvoiceSaga.followActGetInvoiceById(),
    InvoiceSaga.followActPostInvoice(),
    ProductExpireSaga.followActGetListProductItemsExpire(),
    ProductExpireSaga.followActProductItemExpireById(),
    ProductExpireSaga.followActPutProductItemsExpire(),
    ProductExpireSaga.followActPostProductItemsExpire(),
    ProductExpireSaga.followActDeleteProductItemsExpire(),
  ]);
}
