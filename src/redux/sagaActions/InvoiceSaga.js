import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { invoiceActions } from "../reducer/InvoiceReducer";
import { InvoiceService } from "../../service/api/InvoiceApi";

function* actGetListInvoice() {
  try {
    yield put(invoiceActions.getListInvoiceLoading());

    let res = yield call(() => InvoiceService.getInvoicesList());
    let {status, data} = res;
    if (status === 200) {
      yield put(
        invoiceActions.getListInvoiceSuccess({ listInvoice: data })
      );
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actGetInvoiceById(action) {
  try {
    let { id } = action;
    let res = yield call(() => InvoiceService.getInvoiceById(id));
    let {data, status} = res;
    if (status === 200) {
      yield put(invoiceActions.getInvoiceByIdSuccess({invoice : data}));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actPostInvoice(action) {
  try {
    let { newInvoice } = action;
    yield put(invoiceActions.getListInvoiceLoading());
    let res = yield call(() => InvoiceService.postInvoice(newInvoice));
    if (res.status === 201) {
     yield put({ type: SagaActionTypes.GET_LIST_INVOICES_SAGA });
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

export function* followActGetListInvoice() {
  yield takeLatest(SagaActionTypes.GET_LIST_INVOICES_SAGA, actGetListInvoice);
}

export function* followActGetInvoiceById() {
  yield takeLatest(SagaActionTypes.GET_INVOICE_BY_ID_SAGA, actGetInvoiceById);
}

export function* followActPostInvoice() {
  yield takeLatest(SagaActionTypes.POST_INVOICES_SAGA, actPostInvoice);
}