import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffs: [
    {
        "maNhanVien": "1",
        "hoTen": "Bui Minh Tuan",
        "ngaySinh": "2003/12/31",
        "CCCD":  123456789,
        "gioiTinh": "Nam",
        "soDienThoai": "0123456789",
        "email": "123@gmail.com",
        "diaChi": "Thu Duc",
        "khac": "",
    },
    {
        "maNhanVien": "2",
        "hoTen": "Bui Minh Tuan 1",
        "ngaySinh": "2003/12/31",
        "CCCD":  123456789,
        "gioiTinh": "Nam",
        "soDienThoai": "0123456789",
        "email": "123@gmail.com",
        "diaChi": "Thu Duc",
        "khac": "",
    },
    {
        "maNhanVien": "3",
        "hoTen": "Bui Minh Tuan 2",
        "ngaySinh": "2003/12/31",
        "CCCD":  123456789,
        "gioiTinh": "Nam",
        "soDienThoai": "0123456789",
        "email": "123@gmail.com",
        "diaChi": "Thu Duc",
        "khac": "",
    },
    {
        "maNhanVien": "4",
        "hoTen": "Tran Dinh Loc",
        "ngaySinh": "2003/12/25",
        "CCCD":  123456789,
        "gioiTinh": "Nam",
        "soDienThoai": "0123456789",
        "email": "123@gmail.com",
        "diaChi": "Thu Duc",
        "khac": "",
    },
  ]
};

const staffsSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    getListStaffsSuccess: (state, action) => {
        state.staffs = action.payload.staffs;
      },
      addNewStaffs: (state, action) => {
        state.staffs = [action.payload, ...state.staffs];
      },
      // input: id
      removeStaffs: (state, action) => {
        state.staffs = state.staffs.filter((reader) => reader.maNhanVien !== action.payload.maNhanVien);
      },
      //input : reader
      editStaffs: (state, action) => {
        state.staffs =  state.staffs.map((product) => {
          if (product.maNhanVien === action.payload.maNhanVien) {
            return { ...action.payload };
          } else {
            return product;
          }
        });
      },
  },
});

export const staffActions = staffsSlice.actions;

export default staffsSlice.reducer;