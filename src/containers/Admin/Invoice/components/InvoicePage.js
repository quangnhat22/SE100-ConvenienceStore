import { Space } from "antd";
import moment from "moment";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import TableInvoice from "./TableInvoice";
import ModalForm from "../../../../HOC/ModalForm";
import { useDispatch, useSelector } from "react-redux";

const InvoicePage = () => {
  const dispatch = useDispatch();
  const [keyWord, setKeyWord] = useState("");
  const { loading, listInvoice } = useSelector((state) => state.invoiceSlice);
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_INVOICES_SAGA });
  }, []);

  return (
    <div className="pb-5">
      <Space className="flex justify-between border-b p-5">
        <div className="inline-block content-around font-semibold text-2xl whitespace-nowrap">
          Hóa đơn sản phẩm
        </div>
        <Search
          name="search"
          placeholder="Tìm kiếm..."
          allowClear
          onChange={(e) => {
            setKeyWord(e.target.value);
          }}
        />
      </Space>

      {/* Cập nhật thời gian thực */}
      <div className="flex flex-row justify-end items-center px-5 py-2 text-gray-500 opacity-80 italic cursor-default">
        {"Dữ liệu đươc cập nhật lần cuối lúc: " +
          moment(new Date()).format("DD/MM/YYYY  HH:MM")}
      </div>

      <TableInvoice keyWord={keyWord} data={listInvoice} loading={loading} />
      <ModalForm />
    </div>
  );
};

export default InvoicePage;
