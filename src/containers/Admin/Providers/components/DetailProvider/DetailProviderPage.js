import { Form, Button } from "antd";
import Search from "antd/lib/input/Search";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailProviderTable from "./components/DetailProviderTable";
// import ProductLinesForm from "./components/ProductLinesForm";
import ModalForm from "../../../../../HOC/ModalForm";
import * as SagaActionTypes from "../../../../../redux/constants/constant";
import DetailProviderForm from "./components/DetailProviderForm";
import { modalActions } from "../../../../../redux/reducer/ModalReducer";

const DetailProviderPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productsSlice);
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  }, []);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "Vui lòng nhập ${label}!",
  };

  const handleAddProductsLine = () => {
    // dispatch(
    //   modalActions.showModal({
    //     ComponentContent: <ProductLinesForm />,
    //   })
    // );
  };

  return (
    <>
      <div className="ml-3 mt-5 mr-3 mb-8">
        <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-2xl">
          Thông tin của nhà cung cấp
        </div>
        <div className="rounded bg-white py-5 px-3 my-5">
          <DetailProviderForm />
        </div>
        <div className="search-container flex flex-col md:flex-row justify-end items-center gap-x-4 gap-y-2 w-full">
          <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-lg">
            Danh sách dòng sản phẩm
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
            onClick={handleAddProductsLine}
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
            Thêm dòng sản phẩm
          </button>
        </div>
      </div>
      <DetailProviderTable
        data={products}
        keyWord={keyWord}
        loading={loading}
      />
      <div className="flex justify-end w-full">
        <Button className="mx-3 mb-3">Đóng</Button>
      </div>
      <ModalForm />
    </>
  );
};

export default DetailProviderPage;
