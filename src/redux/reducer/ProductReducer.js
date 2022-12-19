import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  listProduct: [
    // {
    //   maSanPham: "1",
    //   tenSanPham: "Nước rửa chén",
    //   giaNhap: 40000,
    //   giaBan: 100000,
    //   thue: 5,
    //   ngaySanXuat: "2/8/2022",
    //   thoiHan: "1/1/2023",
    //   soLuong: 10,
    //   moTa: "",
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
  productById: {
    productId: "",
    deliveryNoteId: 0,
    MFG: "",
    EXP: "",
    cost: 0,
    price: 0,
    quantity: 0,
    description: "",
    image: "",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getListProductLoading: (state, action) => {
      state.requestListProduct = true;
    },
    getListProductSuccess: (state, action) => {
      state.requestListProduct = false;
      state.listProduct = action.payload.listProduct;
    },
    getProductByIdSuccess: (state, action) => {
      state.product = action.payload.product;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
