import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isCreateNewDeliveryNote: false,
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
      state.isCreateNewDeliveryNote = false;
      state.deliveryNotes = action.payload.deliveryNotes;
    },
    getDeliveryNotesByIdSuccess: (state, action) => {
      state.deliveryNote = action.payload.deliveryNote;
      state.loading = false;
    },
    createNewDeliveryNote: (state, action) => {
      state.isCreateNewDeliveryNote = true;
    }
  },
});

export const deliveryNotesActions = deliveryNotesSlice.actions;

export default deliveryNotesSlice.reducer;
