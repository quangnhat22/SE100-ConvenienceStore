import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  productItemsExpire: [],
  productItemExpire: {
    id: 0,
  stateName: "",
  val: 0,
  color: ""
  },
};

const productItemsExpireSlice = createSlice({
  name: "productItemExpireStateRule",
  initialState,
  reducers: {
    getProductItemsExpireLoading: (state, action) => {
      state.loading = true;
    },
    getProductItemsExpireSuccess: (state, action) => {
      state.loading = false;
      state.productItemsExpire = action.payload.productItemsExpire;
    },
    getProductItemExpireByIdSuccess: (state, action) => {
      state.productItemExpire = action.payload.productItemExpire;
    },
  },
});

export const productItemsExpireActions = productItemsExpireSlice.actions;

export default productItemsExpireSlice.reducer;