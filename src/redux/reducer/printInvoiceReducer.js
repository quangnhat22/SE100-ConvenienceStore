import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoice: {
    id: "-1",
    date: "",
    creator: {},
    total: 0,
    invoiceDetails: [],
  },
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
      state.invoice = {
        id: "-1",
        date: "",
        creator: {},
        total: 0,
        invoiceDetails: [],
      };
    },
  },
});

export const printInvoiceActions = printInvoiceSlice.actions;

export default printInvoiceSlice.reducer;
