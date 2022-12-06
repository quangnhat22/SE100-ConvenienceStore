import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  deliveryNotes: [],
  deliveryNote: {
    id: 0,
    provider: {
      id: 0,
      name: "",
      email: "",
      address: "",
    },
    date: "",
    total: 0,
    productItems: [],
  },
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
    getDeliveryNotesByIdSuccess: (state, action) => {
      state.deliveryNote = action.payload.deliveryNote;
    },
  },
});

export const deliveryNotesActions = deliveryNotesSlice.actions;

export default deliveryNotesSlice.reducer;
