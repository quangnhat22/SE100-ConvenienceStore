import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  reports: [],
//   productsById: {
//     maSanPham: "",
//     tenSanPham: "",
//     giaNhap: 0,
//     giaBan: 0,
//     thue: 0,
//     ngaySanXuat: "",
//     thoiHan: "",
//     soLuong: 0,
//     moTa: "",
//   },
};

const reportsSlice = createSlice({
  name: "reportSlice",
  initialState,
  reducers: {
    getListReportLoading: (state, action) => {
      state.loading = true;
    },
    getListReportSuccess: (state, action) => {
      state.reports = action.payload.reports;
      state.loading = false;
    },
  },
});

export const reportsActions = reportsSlice.actions;

export default reportsSlice.reducer;