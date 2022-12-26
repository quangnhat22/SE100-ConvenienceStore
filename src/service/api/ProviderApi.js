import Axios from "axios";
import * as UrlApi from "../url";

export const ProviderService = {
  getProductsOfProvidersById: (providerId) => {
    return Axios.get(UrlApi.URL_PRODUCT_OF_PROVIDER_ID(providerId));
  },
  addProductsOfProvidersById: (providerId, listIdProduct) => {
    return Axios.post(
      UrlApi.URL_PRODUCT_OF_PROVIDER_ID_ADD(providerId),
      listIdProduct
    );
    //return Axios.post(UrlApi.URL_PRODUCT_OF_PROVIDER_ID_ADD(providerId), {listIdProduct});
  },
  removeProductsOfProvidersById: (providerId, listIdProduct) => {
    console.log(providerId);
    return Axios.post(
      UrlApi.URL_PRODUCT_OF_PROVIDER_ID_REMOVE(providerId),
      listIdProduct
    );
  },
  postProviders: (newProvider) => {
    let { name, email, address, phone, representative } = newProvider;
    return Axios.post(UrlApi.URL_PROVIDERS, {
      name: name,
      email: email,
      address: address,
      phone: phone,
      representative: representative,
    });
  },
  getProviders: () => {
    return Axios.get(UrlApi.URL_PROVIDERS);
  },
  getProvidersById: (id) => {
    return Axios.get(UrlApi.URL_PROVIDERS_ID(id));
  },
  deleteProvidersById: (id) => {
    return Axios.delete(UrlApi.URL_PROVIDERS_ID(id));
  },
  putProviders: (id, provider) => {
    let { name, email, address, phone, representative } = provider;
    return Axios.put(UrlApi.URL_PROVIDERS_ID(id), {
      name: name,
      email: email,
      address: address,
      phone: phone,
      representative: representative,
    });
  },
};
