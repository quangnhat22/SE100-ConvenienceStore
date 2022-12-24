import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

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
      let newCartItem = action.payload;
      //check cart is available
      console.log(newCartItem);
      let listCartItem = current(state.cartItems);
      let item = listCartItem.find((item) => item.id === newCartItem.id);
      if (typeof item != "undefined") {
        state.cartItems = state.cartItems.map((cart) => {
          if (
            cart.id === newCartItem.id &&
            cart.quantity < newCartItem.maxQuantity
          ) {
            newCartItem.quantity = cart.quantity + 1;
            return { ...newCartItem };
          } else {
            return cart;
          }
        });
      } else {
        state.cartItems = [action.payload, ...state.cartItems];
      }
    },

    reduceCartItem: (state, action) => {
      let { id } = action.payload;
      state.cartItems = state.cartItems.map((cart) => {
        if (cart.id === id) {
          cart.quantity = cart.quantity - 1;
          return cart;
        } else {
          return cart;
        }
      });
    },

    cartItemQuantityChange: (state, action) => {
      let newCartItem = action.payload;
      //check cart is available
      let listCartItem = current(state.cartItems);
      let item = listCartItem.find((item) => item.id === newCartItem.id);
      if (typeof item != "undefined") {
        state.cartItems = state.cartItems.map((cart) => {
          if (cart.id === newCartItem.id) {
            return { ...newCartItem };
          } else {
            return cart;
          }
        });
      }
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
