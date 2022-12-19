import Axios from "axios";
import * as UrlApi from "../url";

export const ReportService = {
  getReportWeek: () => {
    return Axios.get(UrlApi.URL_GET_REPORT_WEEK);
  },
  getReportMonth: () => {
    return Axios.get(UrlApi.URL_GET_REPORT_MONTH);
  },
  getReportYear: () => {
    return Axios.get(UrlApi.URL_GET_REPORT_YEAR);
  },
};