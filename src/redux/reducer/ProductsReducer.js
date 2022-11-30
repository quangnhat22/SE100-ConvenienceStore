import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading : false,
  products: [
    // {
    //   id: "",
    //   title: "",
    //   tax: 0
    // },
    // {
    //   maSanPham: "2",
    //   tenSanPham: "Dầu gội đầu",
    //   giaNhap: 20000,
    //   giaBan: 80000,
    //   thue: 5,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 20,
    //   moTa: "",
    // },
    // {
    //   maSanPham: "3",
    //   tenSanPham: "Snack",
    //   giaNhap: 40000,
    //   giaBan: 100000,
    //   thue: 2,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 34,
    //   moTa: "",
    // },
    // {
    //   maSanPham: "4",
    //   tenSanPham: "Nước lọc",
    //   giaNhap: 3000,
    //   giaBan: 10000,
    //   thue: 2,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 1,
    //   moTa: "",
    // },
    // {
    //   maSanPham: "5",
    //   tenSanPham: "Nước lọc",
    //   giaNhap: 3000,
    //   giaBan: 10000,
    //   thue: 2,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 1,
    //   moTa: "",
    // },
    // {
    //   maSanPham: "6",
    //   tenSanPham: "Nước lọc",
    //   giaNhap: 3000,
    //   giaBan: 10000,
    //   thue: 2,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 1,
    //   moTa: "",
    // },
    // {
    //   maSanPham: "7",
    //   tenSanPham: "Nước lọc",
    //   giaNhap: 3000,
    //   giaBan: 10000,
    //   thue: 2,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 1,
    //   moTa: "",
    // },
    // {
    //   maSanPham: "8",
    //   tenSanPham: "Nước lọc",
    //   giaNhap: 3000,
    //   giaBan: 10000,
    //   thue: 2,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 1,
    //   moTa: "",
    // },
    // {
    //   maSanPham: "9",
    //   tenSanPham: "Nước lọc",
    //   giaNhap: 3000,
    //   giaBan: 10000,
    //   thue: 2,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 1,
    //   moTa: "",
    // },
    // {
    //   maSanPham: "10",
    //   tenSanPham: "Nước lọc",
    //   giaNhap: 3000,
    //   giaBan: 10000,
    //   thue: 2,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 1,
    //   moTa: "",
    // },
  ],
};

const productsSlice = createSlice({
  name: "productsLine",
  initialState,
  reducers: {
    getListProductsLoading: (state, action) => {
      state.loading = true;
    },
    getListProductsSuccess: (state, action) => {
      console.log("action: ",action);
      state.products = action.payload.products;
      state.loading = false;
      //state.products = action.payload.products;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
