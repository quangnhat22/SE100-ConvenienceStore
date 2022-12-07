import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  productsById: {
    id: "",
    title: "",
    tax: 0,
  },
};

const productsSlice = createSlice({
  name: "productsLine",
  initialState,
  reducers: {
    getListProductsLoading: (state, action) => {
      state.loading = true;
    },
    getListProductsSuccess: (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
    },
    getProductsByIdSuccess: (state, action) => {
      state.productsById = action.payload.productsById;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
