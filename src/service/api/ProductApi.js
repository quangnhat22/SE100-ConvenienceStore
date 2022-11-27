import Axios from "axios";
import * as UrlApi from "../url";

export const ProductService = {
  postProduct: (title, tax) => {
    // return axios({
    //   url: UrlApi.URL_PRODUCTS,
    //   method: "POST",
    //   data: {
    //     title: title,
    //     tax: tax,
    //   },
    // });
    return Axios.post(UrlApi.URL_PRODUCTS, {
      title: title,
      tax: tax,
    });
  },
  getProduct: () => {
    return Axios.get(UrlApi.URL_PRODUCTS);
  },
  getProductById: (id) => {
    return Axios.get(UrlApi.URL_PRODUCT_ID(id));
  },
  deleteProductById: (id) => {
    return Axios.delete(UrlApi.URL_PRODUCT_ID(id));
  },
  putProductById: (id, title, tax) => {
    return Axios.put(UrlApi.URL_PRODUCT_ID(id), {
      title: title,
      tax: tax,
    });
  },
};
