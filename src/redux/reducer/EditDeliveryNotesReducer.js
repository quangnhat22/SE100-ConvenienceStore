import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  newDeliveryNote: {
    providerId: -1,
    date: "",
    creatorId: 0,
    shipper: "",
    productItems: [
      //   {
      //     productId: "",
      //     MFG: "",
      //     EXP: "",
      //     cost: 0,
      //     price: 0,
      //     quantity: 0,
      //     description: "",
      //     image: "",
      //   },
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
        (item) => item.productId === newProductItem.productId
      );

      if (typeof item != "undefined") {
        state.newDeliveryNote.productItems =
          state.newDeliveryNote.productItems.map((product) => {
            if (product.productId === newProductItem.productId) {
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
    },
    removeNewProductItem: (state, action) => {
      let deleteProductItem = action.payload;
      let productItems = current(state.newDeliveryNote.productItems);
      state.newDeliveryNote.productItems = productItems.filter(
        (product) => product.productId === deleteProductItem.productId
      );
    },
  },
});

export const editDeliveryNotesActions = editDeliveryNotesSlice.actions;

export default editDeliveryNotesSlice.reducer;
