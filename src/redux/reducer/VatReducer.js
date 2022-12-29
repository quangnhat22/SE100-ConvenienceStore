import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  vat: {
    id: "-1",
    val: -1,
  },
};

const vatSlice = createSlice({
  name: "vatSlice",
  initialState,
  reducers: {
    getVatLoading: (state, action) => {
      state.loading = true;
      // state.submitSuccess = true;
    },
    getVatSuccess: (state, action) => {
      state.loading = false;
      // state.submitSuccess = true;
      state.vat = action.payload.vat;
    },
  },
});

export const vatActions = vatSlice.actions;

export default vatSlice.reducer;
