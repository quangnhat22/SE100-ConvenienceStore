import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoice: {},
};

const printInvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getInvoice: (state, action) => {
      state.invoice = action.payload;
    },
    // dùng tạm
    //input : reader
    removeInvoice: (state, action) => {
      state.invoice = {};
    },
  },
});

export const printInvoiceActions = printInvoiceSlice.actions;

export default printInvoiceSlice.reducer;
