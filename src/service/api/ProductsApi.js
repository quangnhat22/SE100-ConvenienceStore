import Axios from "axios";
import * as UrlApi from "../url";

export const ProductsService = {
  postProducts: (products) => {
    let { title, tax } = products;
    return Axios.post(UrlApi.URL_PRODUCTS, {
      title: title,
      tax: tax,
    });
  },
  getProducts: () => {
    return Axios.get(UrlApi.URL_PRODUCTS);
  },
  getProductsById: (id) => {
    return Axios.get(UrlApi.URL_PRODUCT_ID(id));
  },
  deleteProductsById: (id) => {
    return Axios.delete(UrlApi.URL_PRODUCT_ID(id));
  },
  putProductsById: (id, products) => {
    let { title, tax } = products;
    return Axios.put(UrlApi.URL_PRODUCT_ID(id), {
      title: title,
      tax: tax,
    });
  },
};
