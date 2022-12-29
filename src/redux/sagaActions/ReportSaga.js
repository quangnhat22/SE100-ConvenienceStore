import { call, put, takeLatest } from "redux-saga/effects";
import * as SagaActionTypes from "../constants/constant";
import { reportsActions } from "../reducer/ReportReducer";
import { ReportService } from "../../service/api/ReportApi";

function* actGetListReportWeek(action) {
  try {
    let { year, month, day } = action;
    yield put(reportsActions.getListReportLoading());

    let res = yield call(() => ReportService.getReportWeek(year, month, day));

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

function* actGetListReportMonth(action) {
  try {
    let { year, month } = action;
    yield put(reportsActions.getListReportLoading());

    let res = yield call(() => ReportService.getReportMonth(year, month));

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

function* actGetListReportYear(action) {
  try {
    let { year } = action;
    yield put(reportsActions.getListReportLoading());

    let res = yield call(() => ReportService.getReportYear(year));

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

function* actFetchReportExcelWeek(action) {
  let { year, month, day } = action;
  try {
    let res = yield call(() =>
      ReportService.getReportWeekExcel(year,month, day)
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.xlsx");
    document.body.appendChild(link);
    link.click(); }
  catch (err) {
    //toast.error("Đã có lỗi xảy ra.");
  }
}

function* actFetchReportExcelMonth(action) {
  let { year, month } = action;
  try {
    let res = yield call(() =>
      ReportService.getReportMonthExcel(year,month)
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.xlsx");
    document.body.appendChild(link);
    link.click(); }
  catch (err) {
    //toast.error("Đã có lỗi xảy ra.");
  }
}

function* actFetchReportExcelYear(action) {
  let { year } = action;
  try {
    let res = yield call(() =>
      ReportService.getReportYearExcel(year)
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.xlsx");
    document.body.appendChild(link);
    link.click(); }
  catch (err) {
    //toast.error("Đã có lỗi xảy ra.");
  }
}

export function* followActGetListReportWeek() {
  yield takeLatest(SagaActionTypes.GET_REPORT_WEEK_SAGA, actGetListReportWeek);
}

export function* followActGetListReportMonth() {
  yield takeLatest(
    SagaActionTypes.GET_REPORT_MONTH_SAGA,
    actGetListReportMonth
  );
}

export function* followActGetListReportYear() {
  yield takeLatest(SagaActionTypes.GET_REPORT_YEAR_SAGA, actGetListReportYear);
}

export function* followActFetchReportExcelWeek() {
  yield takeLatest(SagaActionTypes.GET_REPORT_WEEK_EXCEL_SAGA, actFetchReportExcelWeek);
}

export function* followActFetchReportExcelMonth() {
  yield takeLatest(SagaActionTypes.GET_REPORT_MONTH_EXCEL_SAGA, actFetchReportExcelMonth);
}

export function* followActFetchReportExcelYear() {
  yield takeLatest(SagaActionTypes.GET_REPORT_YEAR_EXCEL_SAGA, actFetchReportExcelYear);
}
