import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  listInvoice: [],
  invoiceById: {},
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getListInvoiceLoading: (state, action) => {
      state.loading = true;
    },
    getListInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.listInvoice = action.payload.listInvoice;
    },
    getInvoiceByIdSuccess: (state, action) => {
      state.invoiceById = action.payload.invoice;
    },
  },
});

export const invoiceActions = invoiceSlice.actions;

export default invoiceSlice.reducer;
