import Axios from "axios";
import * as UrlApi from "../url";

export const ProductItemQuantityService = {
  postProductItemQuantity: (productItemQuantity) => {
    let {stateName, minVal, maxVal, color} = productItemQuantity;
    return Axios.post(UrlApi.URL_PRODUCT_ITEM_QUANTITY_STATE_RULE, {
      stateName: stateName,
      minVal: minVal,
      maxVal: maxVal,
      color: color,
    });
  },
  getProductItemQuantity: () => {
    return Axios.get(UrlApi.URL_PRODUCT_ITEM_QUANTITY_STATE_RULE);
  },
  getProductItemQuantityById: (id) => {
    return Axios.get(UrlApi.URL_PRODUCT_ITEM_QUANTITY_STATE_RULE_ID(id));
  },
  deleteProductItemQuantityById: (id) => {
    return Axios.delete(UrlApi.URL_PRODUCT_ITEM_QUANTITY_STATE_RULE_ID(id));
  },
  putProductItemQuantityById: (id, productItemQuantity) => {
    let {stateName, minVal, maxVal, color} = productItemQuantity;
    return Axios.put(UrlApi.URL_PRODUCT_ITEM_QUANTITY_STATE_RULE_ID(id), {
        stateName: stateName,
        minVal: minVal,
        maxVal: maxVal,
        color: color,
    });
  },
};
