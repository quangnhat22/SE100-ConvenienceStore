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
      //state.cartItems = [action.payload, ...state.cartItems];
      let newCartItem = action.payload;
      //check cart is available
      if (state.cartItems.Contains(action.payload)) {
        state.cartItems = state.cartItems.map((cart) => {
          if (cart.id === newCartItem.id) {
            newCartItem.number = cart.number + 1;
            return { ... newCartItem};
          } else {
            return cart;
          }
        });
      } else {
        state.cartItems = [action.payload, ...state.cartItems];
      }

      
    },
    addNewCartItem: (state, action) => {
      let newCartItem = action.payload;
      //check cart is available
      if (state.cartItems.Contains(action.payload)) {
        state.cartItems = state.cartItems.map((cart) => {
          if (cart.id === newCartItem.id) {
            newCartItem.number = cart.number + 1;
            return { ... newCartItem};
          } else {
            return cart;
          }
        });
      } else {
        state.cartItems = [action.payload, ...state.cartItems];
      }
    },
    reduceCartItem: (state, action) => {
      let {id} = action.payload;
      state.cartItems = state.cartItems.map((cart) => {
        if (cart.id === id) {
          cart.number = cart.number - 1;
          return { ... cart.number};
        } else {
          return cart;
        }
      });
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
