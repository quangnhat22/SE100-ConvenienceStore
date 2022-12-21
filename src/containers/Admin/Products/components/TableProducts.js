import { hover } from "@testing-library/user-event/dist/hover";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table, Tag, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import { productActions } from "../../../../redux/reducer/ProductReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useHistory } from "react-router-dom";

const TableProducts = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { products } = useSelector((state) => state.productSlice);
  const [page, setPage] = React.useState(1);
  // let editProduct = {
  //   : ,
  //   deliveryNoteId: ,
  //   MFG: ,
  //   EXP: ,
  //   cost: ,
  //   price: ,
  //   : ,
  //   description: ,
  //   : ,
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: "5%",
      key: "",
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    // {
    //   title: "Ảnh",
    //   dataIndex: "image",
    //   key: "image",
    //   width: "5%",
    //   render: (value, record) => {
    //     return <img className="w-16" src={`${record.hinhAnh}`} alt="" />;
    //   },
    // },
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
      width: "10%",
      sorter: (item1, item2) => item1.id.localeCompare(item2.id),
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên dòng sản phẩm",
      dataIndex: ["product", "title"],
      key: "title",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
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
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      width: "10%",
      render: (text, record, index) => {
        return (
          <Tag
            key={index}
            color={record.state.color}
            className="w-2/4 min-w-max text-center"
          >
            {record.state.stateName}
          </Tag>
        );
      },
      // filters: [
      //   { text: "Còn hàng", value: 2 },
      //   { text: "Sắp hết hàng", value: 1 },
      //   { text: "Hết hàng", value: 0 },
      // ],
      // onFilter: (value, record) => {
      //   if (value === 2) {
      //     return record.soLuong >= 10;
      //   } else if (value === 1) {
      //     return record.soLuong < 10 && record.soLuong > 0;
      //   } else {
      //     return record.soLuong === 0;
      //   }
      // },
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
          <button
            type="button"
            className="text-white font-bold py-3 px-3 rounded inline-flex items-center edit-button"
            onClick={() => handleEditProduct(record)}
          >
            <EditFilled />
          </button>
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
  const handleEditProduct = (record) => {
    // useHistory.push({
    //   pathname: "/detail_product",
    //   state: { product: record },
    // });
    history.push("/detail_product/" + record.id);
  };
  const handleRemoveProduct = (record) => {
    dispatch({
      type: SagaActionTypes.DELETE_PRODUCT_ITEM_SAGA,
      id: record.productId,
    });
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

export default TableProducts;
