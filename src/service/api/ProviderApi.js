import Axios from "axios";
import * as UrlApi from "../url";

export const ProviderService = {
  postProviders: (name, email, address) => {
    return Axios.post(UrlApi.URL_PROVIDERS, {
      name: name,
      email: email,
      address: address,
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
  putProvidersById: (id, name, email, address) => {
    return Axios.put(UrlApi.URL_PROVIDERS_ID(id), {
      name: name,
      email: email,
      address: address,
    });
  },
};
