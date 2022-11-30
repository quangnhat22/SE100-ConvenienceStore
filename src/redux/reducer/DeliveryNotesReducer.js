import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  deliveryNotes: [],
};

const deliveryNotesSlice = createSlice({
  name: "deliveryNotes",
  initialState,
  reducers: {
    getDeliveryNotesLoading: (state, action) => {
      state.loading = true;
    },
    getDeliveryNotesSuccess: (state, action) => {
      state.loading = true;
      state.deliveryNotes = action.payload.deliveryNotes;
    },
  },
});

export const deliveryNotesActions = deliveryNotesSlice.actions;

export default deliveryNotesSlice.reducer;
