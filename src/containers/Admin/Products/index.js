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

  // const handleAddProduct = () => {
  //   history.push("/add_product");
  // };

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
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
          {/* button search */}
        </div>
      </div>

      <TableProducts data={listProduct} keyWord={keyWord} loading={loading} />
      <ModalForm />
    </>
  );
};

export default ProductsPage;
