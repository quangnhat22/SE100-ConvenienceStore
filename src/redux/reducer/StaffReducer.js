import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  staffs: [],
  staff: {
    id: -1,
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
};

const staffsSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    getListStaffsInLoading: (state, action) => {
      state.loading = true;
      // state.submitSuccess = true;
    },
    getListStaffsSuccess: (state, action) => {
      state.loading = false;
      // state.submitSuccess = true;
      state.staffs = action.payload.staffs;
    },
    getListStaffByIdSuccess: (state, action) => {
      console.log(action);
      state.loading = false;
      // state.submitSuccess = true;
      state.staff = action.payload.staff;
    },
  },
});

export const staffActions = staffsSlice.actions;

export default staffsSlice.reducer;
