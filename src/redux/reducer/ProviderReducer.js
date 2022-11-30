import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading : false,
  providers: [],
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
  },
});

export const providerActions = providerSlice.actions;

export default providerSlice.reducer;