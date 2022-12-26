import Axios from "axios";
import * as UrlApi from "../url";

export const ReportService = {
  getReportWeek: (year, month, day) => {
    return Axios.get(UrlApi.URL_GET_REPORT_WEEK(year, month, day));
  },
  getReportMonth: (year, month) => {
    return Axios.get(UrlApi.URL_GET_REPORT_MONTH(year, month));
  },
  getReportYear: (year) => {
    return Axios.get(UrlApi.URL_GET_REPORT_YEAR(year));
  },
};