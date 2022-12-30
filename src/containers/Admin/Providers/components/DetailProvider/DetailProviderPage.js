import { Form, Button, Spin, Space } from "antd";
import Search from "antd/lib/input/Search";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailProviderTable from "./components/DetailProviderTable";
// import ProductLinesForm from "./components/ProductLinesForm";
import ModalForm from "../../../../../HOC/ModalForm";
import * as SagaActionTypes from "../../../../../redux/constants/constant";
import DetailProviderForm from "./components/DetailProviderForm";
import AddProductLineInProvider from "./components/AddProductLineInProvider";
import { modalActions } from "../../../../../redux/reducer/ModalReducer";
import { useHistory, useParams } from "react-router-dom";

const DetailProviderPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  let { provider, productOfProvider, loading } = useSelector(
    (state) => state.providerSlice
  );
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PROVIDER_BY_ID_SAGA, id: id });
    // dispatch({
    //   type: SagaActionTypes.GET_LIST_PRODUCT_PROVIDER_ID_SAGA,
    //   providerId: id,
    // });
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCTS_SAGA });
  }, []);

  const handleClose = () => {
    history.goBack();
  };

  const handleAddProductsLine = () => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <AddProductLineInProvider />,
      })
    );
  };

  if (loading === true) {
    return (
      <div className="w-full flex items-center justify-center mb-12 h-4/5">
        <Space size="middle ">
          <Spin size="large" tip="Loading..." />
        </Space>
      </div>
    );
  }

  return (
    <>
      <div className="ml-3 mt-5 mr-3 mb-8">
        <div className="inline-block font-semibold md:mr-auto whitespace-nowrap text-2xl">
          Nhà cung cấp: {id} - {provider.name}
        </div>
        <div className="rounded bg-white py-5 px-3 my-5">
          <DetailProviderForm provider={provider} />
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
      <DetailProviderTable data={productOfProvider} keyWord={keyWord} />
      <Space className="flex justify-end w-full px-5 pb-5">
        <Button
          className="rounded bg-red-500 opacity-90 text-white hover:opacity-100 shadow-md"
          size="large"
          type="primary"
          danger
          onClick={() => handleClose()}
        >
          Đóng
        </Button>
      </Space>
      <ModalForm />
    </>
  );
};

export default DetailProviderPage;
