import Axios from "axios";
import * as UrlApi from "../url";

export const DeliveryNotesService = {
  postDeliveryNotes: (newDeliveryNote) => {
    let {
      providerId,
      date,
    } = newDeliveryNote;
    return Axios.post(UrlApi.URL_DELIVERY_NOTES, {
      providerId: providerId,
      date: date,
    });
  },
  getDeliveryNotes: () => {
    return Axios.get(UrlApi.URL_DELIVERY_NOTES);
  },
  getDeliveryNotesById: (id) => {
    return Axios.get(UrlApi.URL_DELIVERY_NOTES_BY_ID(id));
  },
  deleteDeliveryNotesById: (id) => {
    return Axios.delete(UrlApi.URL_DELIVERY_NOTES_BY_ID(id));
  },
};
