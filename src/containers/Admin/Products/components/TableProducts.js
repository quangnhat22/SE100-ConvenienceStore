import { hover } from "@testing-library/user-event/dist/hover";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table, Tag, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import { productActions } from "../../../../redux/reducer/ProductReducer";
import ProductInforDetail from "./ProductInforDetail";

const TableProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsSlice);
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
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: "5%",
      render: (value, record) => {
        return <img className="w-16" src={`${record.hinhAnh}`} alt="" />;
      },
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "maSanPham",
      key: "maSanPham",
      width: "10%",
      sorter: (item1, item2) => item1.maSanPham.localeCompare(item2.maSanPham),
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Giá nhập",
      dataIndex: "giaNhap",
      key: "giaNhap",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      key: "giaBan",
      showOnResponse: true,
      showOnDesktop: true,
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      showOnResponse: true,
      showOnDesktop: true,
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "soLuong",
      key: "soLuong",
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      width: "10%",
      render: (text, record, index) => {
        let colorTag = text === 0 ? "red" : text < 10 ? "yellow" : "green";
        let contentTag =
          text === 0 ? "Hết hàng" : text < 10 ? "Sắp hết hàng" : "Còn hàng";
        return (
          <Tag
            key={index}
            color={colorTag}
            className="w-2/4 min-w-max text-center"
          >
            {contentTag}
          </Tag>
        );
      },
      filters: [
        { text: "Còn hàng", value: 2 },
        { text: "Sắp hết hàng", value: 1 },
        { text: "Hết hàng", value: 0 },
      ],
      onFilter: (value, record) => {
        if (value === 2) {
          return record.soLuong >= 10;
        } else if (value === 1) {
          return record.soLuong < 10 && record.soLuong > 0;
        } else {
          return record.soLuong === 0;
        }
      },
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
  const handleEditProduct = (product) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: (
          <ProductInforDetail product={product}></ProductInforDetail>
        ),
      })
    );
  };
  const handleRemoveProduct = (product) => {
    dispatch(productActions.removeProduct(product));
  };
  return (
    <>
      <TableTemplate
        columns={columns}
        dataSource={products}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          defaultPageSize: 6,
          showSizeChanger: false,
          pageSizeOptions: ["6"],
        }}
        rowKey={"maSanPham"}
      />
    </>
  );
};

export default TableProducts;
