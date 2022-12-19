import Axios from "axios";
import * as UrlApi from "../url";

export const InvoiceService = {
  getInvoicesList: () => {
    return Axios.get(UrlApi.URL_GET_INVOICES);
  },
  getInvoiceById: (id) => {
    return Axios.get(UrlApi.URL_GET_INVOICES_BY_ID(id));
  },
  postInvoice: (newInvoice) => {
    let { date, userId, total, details } = newInvoice;
    return Axios.post(UrlApi.URL_POST_INVOICES, {
      date: date,
      userId: userId,
      total: total,
      details: details,
    });
  },
};
