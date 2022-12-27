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
      phone: "",
      representative: "",
      updatedAt: "",
    },
    date: "",
    total: 0,
    creator: {
      id: 1,
      email: "",
      fullname: "",
      birthday: "",
      identityNumber: "",
      gender: "",
      phoneNumber: "",
      address: "",
      other: "",
      avatar: "",
      role: "",
      updatedAt: "",
    },
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
      state.loading = false;
      state.deliveryNotes = action.payload.deliveryNotes;
    },
    getDeliveryNotesByIdSuccess: (state, action) => {
      state.deliveryNote = action.payload.deliveryNote;
      state.loading = false;
    },
  },
});

export const deliveryNotesActions = deliveryNotesSlice.actions;

export default deliveryNotesSlice.reducer;
