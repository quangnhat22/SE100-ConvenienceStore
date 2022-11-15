import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regulations: [
    {
      maTrangThai: "1",
      tenTrangThai: "Còn hàng",
      min: 10,
      max: 10000,
      color: "green",
    },
    {
      maTrangThai: "2",
      tenTrangThai: "Sắp hết hàng",
      min: 1,
      max: 10,
      color: "yellow",
    },
    {
      maTrangThai: "3",
      tenTrangThai: "Hết hàng",
      min: 0,
      max: 0,
      color: "red",
    },
  ],
  othersRegulation: [
    {
      maQuyDinh: "1",
      tenQuyDinh: "Thuế VAT (%)",
      value: 5
    },
  ],
};

const regulationSlice = createSlice({
  name: "regulation",
  initialState,
  reducers: {
    getListRegulationSuccess: (state, action) => {
      state.regulations = action.payload.regulations;
    },
    addNewRegulation: (state, action) => {
      state.regulations = [action.payload, ...state.regulations];
    },
    // input: id
    removeRegulation: (state, action) => {
      state.regulations = state.regulations.filter(
        (reader) => reader.maTrangThai !== action.payload.maTrangThai
      );
    },
    //input : reader
    editRegulation: (state, action) => {
      state.regulations = state.staffs.map((regulation) => {
        if (regulation.maTrangThai === action.payload.maTrangThai) {
          return { ...action.payload };
        } else {
          return regulation;
        }
      });
    },
  },
});

export const regulationActions = regulationSlice.actions;

export default regulationSlice.reducer;
