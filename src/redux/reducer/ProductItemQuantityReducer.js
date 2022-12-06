import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  productItemsQuantity: [],
  productItemQuantity: {
    id: 0,
    stateName: "",
    minVal: 0,
    maxVal: 0,
    color: ""
  },
};

const productItemsQuantitySlice = createSlice({
  name: "productItemQuantityStateRule",
  initialState,
  reducers: {
    getProductItemsQuantityLoading: (state, action) => {
      state.loading = true;
    },
    getProductItemsQuantitySuccess: (state, action) => {
      state.loading = false;
      state.productItemsQuantity = action.payload.productItemsQuantity;
    },
    getProductItemQuantityByIdSuccess: (state, action) => {
      state.productItemQuantity = action.payload.productItemQuantity;
    },
  },
});

export const productItemsQuantityActions = productItemsQuantitySlice.actions;

export default productItemsQuantitySlice.reducer;
