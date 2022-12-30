import React, { useEffect } from "react";
import TableRegulation from "./components/TableRegulation";
import RegulationForm from "./components/RegulationForm";
import ModalForm from "../../../HOC/ModalForm";
import { modalActions } from "../../../redux/reducer/ModalReducer";
import { useDispatch, useSelector } from "react-redux";
import TableOtherRegulation from "./components/TableOtherRegulation";
import * as SagaActionTypes from "../../../redux/constants/constant";
import { Space, Spin } from "antd";
import TableExpiredDate from "./components/TableExpiredDate";
import ExpiredDateForm from "./components/ExpiredDateForm";

const SettingPage = () => {
  const dispatch = useDispatch();
  let { loading, productItemsQuantity } = useSelector(
    (state) => state.productItemsQuantitySlice
  );
  let vatSlice = useSelector((state) => state.vatSlice);
  let productItemsExpireSlice = useSelector(
    (state) => state.productItemsExpireSlice
  );
  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_LIST_PRODUCTS_ITEM_QUANTITY_RULE_SAGA,
    });
    dispatch({ type: SagaActionTypes.GET_VAT_SAGA });
    dispatch({ type: SagaActionTypes.GET_PRODUCT_EXPIRE_SAGA });
  }, []);

  const handleAddNewRegulation = () => {
    dispatch(
      modalActions.showModal({
        // title: "Thêm trạng thái",
        ComponentContent: <RegulationForm />,
      })
    );
  };

  const handleAddNewExpiredDate = () => {
    dispatch(
      modalActions.showModal({
        // title: "Thêm quy định",
        ComponentContent: <ExpiredDateForm />,
      })
    );
  };

  if (
    loading === true ||
    productItemsExpireSlice.loading === true ||
    vatSlice.loading === true
  ) {
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
      <div className="ml-4 mt-5 mr-3 mb-5 flex flex-col justify-between items-center md:flex-row">
        <p className="font-semibold text-base">Quy định trạng thái hàng hoá</p>

        <div className="search-container flex flex-col items-center md:flex-row">
          {/* button search */}
          <button
            className="flex items-center justify-center
                    bg-blue-500 h-8 w-fit p-2 text-white
                    md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
            onClick={handleAddNewRegulation}
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
            Thêm trạng thái
          </button>
        </div>
      </div>
      <TableRegulation productItemsQuantity={productItemsQuantity} />

      <div className="ml-4 mt-5 mr-3 mb-5 flex flex-col justify-between items-center md:flex-row">
        <p className="font-semibold text-base">Quy định hạn sử dụng</p>

        <div className="search-container flex flex-col items-center md:flex-row">
          {/* button search */}
          <button
            className="flex items-center justify-center
                    bg-blue-500 h-8 w-fit p-2 text-white
                    md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
            onClick={handleAddNewExpiredDate}
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
            Thêm quy định
          </button>
        </div>
      </div>

      <TableExpiredDate />

      <p className="ml-4 mt-5 font-semibold text-base">Quy định khác</p>

      <TableOtherRegulation />

      <ModalForm />
    </>
  );
};

export default SettingPage;
