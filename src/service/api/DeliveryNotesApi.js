import Axios from "axios";
import * as UrlApi from "../url";

export const DeliveryNotesService = {
  postDeliveryNotes: (newDeliveryNote) => {
    let { providerId, date, creatorId, shipper, productItems } =
      newDeliveryNote;
    return Axios.post(UrlApi.URL_DELIVERY_NOTES, {
      providerId: providerId,
      date: date,
      creatorId: creatorId,
      shipper: shipper,
      productItems: productItems,
    });
  },
  putDeliveryNotes: (newDeliveryNote) => {
    let { providerId, date, creatorId, shipper, productItems } =
      newDeliveryNote;
    return Axios.put(UrlApi.URL_DELIVERY_NOTES, {
      providerId: providerId,
      date: date,
      creatorId: creatorId,
      shipper: shipper,
      productItems: productItems,
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
