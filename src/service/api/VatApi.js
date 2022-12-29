import Axios from "axios";
import * as UrlApi from "../url";

export const VatService = {
  getVat: () => {
    return Axios.get(UrlApi.URL_VAT);
  },
  putVat: (val) => {
    return Axios.put(UrlApi.URL_VAT, {
      val: val
    });
  },
};