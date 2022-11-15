import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
        "maSanPham": "1",
        "tenSanPham": "Nước rửa chén",
        "giaNhap": 40000,
        "giaBan":  100000,
        "thue": 5,
        "thoiHan": "2026/1/1",
        "soLuong": 10,
        "moTa": "",
    },
    {
        "maSanPham": "2",
        "tenSanPham": "Dầu gội đầu",
        "giaNhap": 20000,
        "giaBan":  80000,
        "thue": 5,
        "thoiHan": "2026/1/1",
        "soLuong": 20,
        "moTa": "",
    },
    {
        "maSanPham": "3",
        "tenSanPham": "Snack",
        "giaNhap": 40000,
        "giaBan":  100000,
        "thue": 2,
        "thoiHan": "2026/1/1",
        "soLuong": 34,
        "moTa": "",
    },
    {
      "maSanPham": "4",
      "tenSanPham": "Nước lọc",
      "giaNhap": 3000,
      "giaBan":  10000,
      "thue": 2,
      "thoiHan": "2026/1/1",
      "soLuong": 1,
      "moTa": "",
  }
  ]
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getListProductSuccess: (state, action) => {
        state.products = action.payload.products;
      },
      addNewReader: (state, action) => {
        state.products = [action.payload, ...state.products];
      },
      // input: id
      removeReader: (state, action) => {
        state.products = state.products.filter((reader) => reader.maSanPham !== action.payload.maSanPham);
      },
      //input : reader
      editReader: (state, action) => {
        state.products =  state.products.map((product) => {
          if (product.maSanPham === action.payload.maSanPham) {
            return { ...action.payload };
          } else {
            return product;
          }
        });
      },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;