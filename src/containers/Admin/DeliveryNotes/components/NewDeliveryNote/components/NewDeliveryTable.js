import { hover } from "@testing-library/user-event/dist/hover";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table, Tag, Popconfirm, Space, Tooltip, Spin } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../../../HOC/ModalForm";
import TableTemplate from "../../../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../../../redux/reducer/ModalReducer";
import { productActions } from "../../../../../../redux/reducer/ProductReducer";
import * as SagaActionTypes from "../../../../../../redux/constants/constant";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { editDeliveryNotesActions } from "../../../../../../redux/reducer/EditDeliveryNotesReducer";

const NewDeliveryTable = ({ data, keyWord }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { productOfProvider } = useSelector((state) => state.providerSlice);
  const [page, setPage] = React.useState(1);
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: "5%",
      key: "",
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: "Tên dòng sản phẩm",
      dataIndex: "productId",
      key: "productId",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(
            productOfProvider.find((item) => item.id === record.productId).title
          )
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.cost).toLowerCase().includes(value.toLowerCase()) ||
          String(record.price).toLowerCase().includes(value.toLowerCase()) ||
          String(moment(record.MFG).format("DD/MM/YYYY"))
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(moment(record.EXP).format("DD/MM/YYYY"))
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.quantity).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (productId) => {
        let productLine = productOfProvider.find(
          (item) => item.id === productId
        );
        if (typeof productLine != "undefined") {
          return productLine.title;
        }
      },
    },
    {
      title: "Giá nhập",
      dataIndex: "cost",
      key: "cost",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      showOnResponse: true,
      showOnDesktop: true,
      width: "15%",
      ellipsis: true,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "MFG",
      key: "MFG",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (MFG) => `${moment(MFG).format("DD/MM/YYYY")}`,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "EXP",
      key: "EXP",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (EXP) => `${moment(EXP).format("DD/MM/YYYY")}`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      showOnResponse: true,
      showOnDesktop: true,
      width: "10%",
      ellipsis: true,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Thao tác",
      key: "action",
      ellipsis: true,
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      fixed: "right",
      align: "center",
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa sản phẩm này?"
            okText="Xác nhận"
            cancelText="Hủy"
            okType="default"
            okButtonProps={{
              className:
                "text-red-400 border-red-400 hover:text-red-600 hover:border-red-600",
            }}
            cancelButtonProps={{
              className:
                "text-gray-400 border-gray-400 hover:text-gray-500 hover:border-gray-500",
            }}
            onConfirm={() => handleRemoveProduct(record)}
          >
            <button
              type="button"
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-3 rounded inline-flex items-center"
            >
              <DeleteFilled />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleRemoveProduct = (record) => {
    dispatch(editDeliveryNotesActions.removeNewProductItem(record));
  };

  return (
    <>
      <TableTemplate
        columns={columns}
        dataSource={data}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          defaultPageSize: 6,
          showSizeChanger: false,
          pageSizeOptions: ["6"],
        }}
        rowKey={"id"}
      />
    </>
  );
};

export default NewDeliveryTable;
