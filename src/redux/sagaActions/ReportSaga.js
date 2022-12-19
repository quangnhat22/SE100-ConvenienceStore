import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { reportsActions } from "../reducer/ReportReducer";
import { ReportService } from "../../service/api/ReportApi";

function* actGetListReportWeek() {
  try {
    yield put(reportsActions.getListReportLoading());

    let res = yield call(() => ReportService.getReportWeek());

    let { status, data } = res;
    if (status === 200) {
      yield put(reportsActions.getListReportSuccess({ reports: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}


function* actGetListReportMonth() {
  try {
    yield put(reportsActions.getListReportLoading());

    let res = yield call(() => ReportService.getReportMonth());

    let { status, data } = res;
    if (status === 200) {
      yield put(reportsActions.getListReportSuccess({ reports: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}

function* actGetListReportYear() {
  try {
    yield put(reportsActions.getListReportLoading());

    let res = yield call(() => ReportService.getReportYear());

    let { status, data } = res;
    if (status === 200) {
      yield put(reportsActions.getListReportSuccess({ reports: data }));
    } else {
      //yield put(authActions.requestLogFailed());
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
  }
}


export function* followActGetListReportWeek() {
  yield takeLatest(SagaActionTypes.GET_REPORT_WEEK_SAGA, actGetListReportWeek);
}

export function* followActGetListReportMonth() {
  yield takeLatest(SagaActionTypes.GET_REPORT_MONTH_SAGA, actGetListReportMonth);
}

export function* followActGetListReportYear() {
  yield takeLatest(SagaActionTypes.GET_REPORT_YEAR_SAGA, actGetListReportYear);
}


