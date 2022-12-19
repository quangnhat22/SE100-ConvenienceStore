import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  submitSuccess: true,
  staffs: [],
  staff: {
    maNhanVien: "",
    hoTen: "",
    ngaySinh: "",
    CCCD: "",
    gioiTinh: "",
    soDienThoai: "",
    email: "",
    diaChi: "",
    khac: "",
  },
};

const staffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    getListStaffsInLoading: (state, action) => {
      state.loading = true;
      state.submitSuccess = true;
    },
    getListStaffsSuccess: (state, action) => {
      state.loading = false;
      state.submitSuccess = true;
      state.staffs = action.payload.staffs;
    },
    getListStaffByIdSuccess: (state, action) => {
      state.loading = false;
      state.submitSuccess = true;
      state.staffs = action.payload.staff;
    },
    actionSuccess: (state, action) => {
      console.log(state);
      state.submitSuccess = true;
    },
    actionFail: (state, action) => {
      state.submitSuccess = false;
    },
  },
});

export const staffActions = staffSlice.actions;

export default staffSlice.reducer;
