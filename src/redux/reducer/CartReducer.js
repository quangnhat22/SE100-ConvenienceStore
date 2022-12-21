import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getListCartItemsLoading: (state, action) => {
      state.loading = true;
    },
    getListCartItemsSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cartItems;
    },
    // dùng tạm
    //input : reader
    addNewCartItem: (state, action) => {
      state.cartItems = [action.payload, ...state.cartItems];
    },
    // input: id
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
