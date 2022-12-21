import Axios from "axios";
import * as UrlApi from "../url";

export const ProductItemExpireService = {
  postProductItemExpire: (productItemExire) => {
    let {id, stateName, val, color} = productItemExire;
    return Axios.post(UrlApi.URL_PRODUCT_ITEM_EXPIRE_STATE, {
      id: id,
      stateName: stateName,
      val: val,
      color: color,
    });
  },
  getProductItemExpire: () => {
    return Axios.get(UrlApi.URL_PRODUCT_ITEM_EXPIRE_STATE);
  },
  getProductItemExpireById: (id) => {
    return Axios.get(UrlApi.URL_PRODUCT_ITEM_EXPIRE_STATE_BY_ID(id));
  },
  deleteProductItemExpireById: (id) => {
    return Axios.delete(UrlApi.URL_PRODUCT_ITEM_EXPIRE_STATE_BY_ID(id));
  },
  putProductItemExpireById: (id, productItemExpire) => {
    let {stateName, val, color} = productItemExpire;
    return Axios.put(UrlApi.URL_PRODUCT_ITEM_EXPIRE_STATE_BY_ID(id), {
        id: id,
        stateName: stateName,
        val: val,
        color: color,
    });
  },
};
