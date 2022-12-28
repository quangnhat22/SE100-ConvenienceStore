import { createSlice, current } from "@reduxjs/toolkit";
import moment from "moment";
import AlertCustom from "../../common/Notification/Alert";

const initialState = {
  newDeliveryNote: {
    providerId: -1,
    date: "",
    creatorId: 0,
    shipper: "",
    productItems: [
      // {
      //   productId: "",
      //   MFG: "",
      //   EXP: "",
      //   cost: 0,
      //   price: 0,
      //   quantity: 0,
      //   description: "",
      //   image: "",
      // },
    ],
  },
};

const editDeliveryNotesSlice = createSlice({
  name: "editdeliveryNotes",
  initialState,
  reducers: {
    getNewDeliveryNotes: (state, action) => {
      state.newDeliveryNote = action.payload.newDeliveryNote;
    },
    addNewProductItem: (state, action) => {
      let newProductItem = action.payload;
      let productItems = current(state.newDeliveryNote.productItems);

      let item = productItems.find(
        (item) =>
          item.productId === newProductItem.productId &&
          moment(item.EXP).format("DD/MM/YYYY") ===
            moment(newProductItem.EXP).format("DD/MM/YYYY") &&
          moment(item.MFG).format("DD/MM/YYYY") ===
            moment(newProductItem.MFG).format("DD/MM/YYYY")
      );

      if (typeof item != "undefined") {
        state.newDeliveryNote.productItems = productItems.map((product) => {
          if (
            product.productId === newProductItem.productId &&
            moment(product.EXP).format("DD/MM/YYYY") ===
              moment(newProductItem.EXP).format("DD/MM/YYYY") &&
            moment(product.MFG).format("DD/MM/YYYY") ===
              moment(newProductItem.MFG).format("DD/MM/YYYY")
          ) {
            newProductItem.quantity += product.quantity;
            return { ...newProductItem };
          } else {
            return product;
          }
        });
      } else {
        state.newDeliveryNote.productItems = [
          newProductItem,
          ...state.newDeliveryNote.productItems,
        ];
      }
      AlertCustom({ type: "success", title: "Thêm sản phẩm thành công" });
    },
    removeNewProductItem: (state, action) => {
      console.log("abc", action.payload);
      let deleteProductItem = action.payload;
      let productItems = current(state.newDeliveryNote.productItems);
      state.newDeliveryNote.productItems = productItems.filter(
        (product) =>
          product.productId !== deleteProductItem.productId ||
          moment(product.EXP).format("DD/MM/YYYY") !==
            moment(deleteProductItem.EXP).format("DD/MM/YYYY") ||
          moment(product.MFG).format("DD/MM/YYYY") !==
            moment(deleteProductItem.MFG).format("DD/MM/YYYY")
      );
      AlertCustom({ type: "success", title: "Xóa sản phẩm thành công" });
    },
  },
});

export const editDeliveryNotesActions = editDeliveryNotesSlice.actions;

export default editDeliveryNotesSlice.reducer;
