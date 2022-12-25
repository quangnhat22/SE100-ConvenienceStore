import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  providers: [],
  provider: {
    id: 0,
    name: "",
    email: "",
    address: "",
    phone: "",
    representative: "",
    updatedAt: "",
  },
  productOfProvider: []
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    getListProviderLoading: (state, action) => {
      state.loading = true;
    },
    getListProviderSuccess: (state, action) => {
      state.providers = action.payload.providers;
      state.loading = false;
    },
    getProviderByIdSuccess: (state, action) => {
      state.provider = action.payload.provider;
    },
    getProductOfProviderLoading: (state, action) => {
      state.loading = true;
    },
    getProductOfProviderSuccess: (state, action) => {
      state.loading = false;
      state.productOfProvider = action.payload.productOfProvider;
    },
  },
});

export const providerActions = providerSlice.actions;

export default providerSlice.reducer;
