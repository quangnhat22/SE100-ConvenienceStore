import { hover } from "@testing-library/user-event/dist/hover";
import moment from "moment";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import { Table, Tag, Popconfirm, Space, Tooltip, Spin } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import { productActions } from "../../../../redux/reducer/ProductReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { useHistory } from "react-router-dom";

const TableProductsDetail = ({ data, keyWord, loading }) => {
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
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.product.title)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.cost).toLowerCase().includes(value.toLowerCase()) ||
          String(record.price).toLowerCase().includes(value.toLowerCase()) ||
          String(record.initialQuantity)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          record.state.find((item) =>
            item.stateName.toLowerCase().includes(value.toLowerCase())
          ) ||
          String(moment(record.EXP).format("DD/MM/YYYY"))
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(moment(record.MFG).format("DD/MM/YYYY"))
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
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
      render: (text, record, index) => {
        return (
          <div>
            {record.cost
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
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
      render: (text, record, index) => {
        return (
          <div>
            {record.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
    },
    {
      title: "Số lượng nhập",
      dataIndex: "initialQuantity",
      key: "initialQuantity",
      showOnResponse: true,
      showOnDesktop: true,
      width: "10%",
      ellipsis: true,
      sorter: (a, b) => a.initialQuantity - b.initialQuantity,
      render: (text, record, index) => {
        return (
          <div>
            {record.initialQuantity
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        );
      },
    },
    {
      title: "Ngày sản xuất",
      dataIndex: "MFG",
      key: "MFG",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (a, b) => a.MFG > b.MFG,
      render: (MFG) => `${moment(MFG).format("DD/MM/YYYY")}`,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "EXP",
      key: "EXP",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (a, b) => a.EXP > b.EXP,
      render: (EXP) => `${moment(EXP).format("DD/MM/YYYY")}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      width: "10%",
      render: (state) => (
        <>
          {state.map((item) => (
            <Tag color={item.color} key={item.stateName}>
              {item.stateName}
            </Tag>
          ))}
        </>
      ),
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
            <EyeFilled />
          </button>
        </Space>
      ),
    },
  ];
  const handleEditProduct = (record) => {
    history.push("/detail_product/" + record.id);
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

export default TableProductsDetail;
