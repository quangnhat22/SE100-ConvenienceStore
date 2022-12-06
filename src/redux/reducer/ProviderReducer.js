import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  providers: [],
  provider: {
    id: 0,
    name: "",
    email: "",
    address: "",
  },
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
  },
});

export const providerActions = providerSlice.actions;

export default providerSlice.reducer;
