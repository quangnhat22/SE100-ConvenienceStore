import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import TableProducts from "./components/TableProducts";
import ModalForm from "../../../HOC/ModalForm";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../redux/reducer/ModalReducer";
import {
  DownloadOutlined,
  TeamOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { useEffect } from "react";
import { type } from "@testing-library/user-event/dist/type";
import * as SagaActionTypes from "../../../redux/constants/constant";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";
import { useHistory } from "react-router-dom";

const ProductsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { listProduct, loading } = useSelector((state) => state.productSlice);
  const [keyWord, setKeyWord] = useState("");

  // const handleAddProduct = () => {
  //   dispatch(
  //     modalActions.showModal({
  //       ComponentContent: <AddProductForm />,
  //     })
  //   );
  // };
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
  }, []);

  const handleAddProduct = () => {
    history.push("/add_product");
  };

  return (
    <>
      <div className="ml-7 mt-5 mr-3 mb-8">
        <div className="search-container flex flex-col md:flex-row justify-end items-center gap-x-4 gap-y-2 w-full">
          <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-2xl">
            Danh sách sản phẩm
          </div>
          <Search
            className="min-w-min max-w-xs"
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            onSearch={(value) => {
              setKeyWord(value);
            }}
          />
          {/* button search */}
          <button
            className="flex items-center justify-center
                    bg-blue-500 h-8 w-fit p-2 text-white
                    md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
            onClick={handleAddProduct}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Thêm sản phẩm
          </button>
        </div>
      </div>

      <TableProducts data={listProduct} keyWord={keyWord} loading={loading} />
      <ModalForm />
    </>
  );
};

export default ProductsPage;
