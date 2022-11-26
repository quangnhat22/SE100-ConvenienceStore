import { hover } from "@testing-library/user-event/dist/hover";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table, Tag, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import { productActions } from "../../../../redux/reducer/ProductReducer";
import ProductInforDetail from "../../Products/components/ProductInforDetail";

//Data Demo
const providers = [
  {
    maNhaCungCap: "NCC1",
    tenNhaCungCap: "TẠP HÓA CHỊ HUYỀN",
    nhomNhaCungCap: "MACDINH",
    email: "huynhhgt@gnmail.com",
    soDienThoai: "0967654554",
    trangThai: true,
  },
  {
    maNhaCungCap: "NCC2",
    tenNhaCungCap: "NHÀ PHÂN PHỐI ĐÔNG BA",
    nhomNhaCungCap: "MACDINH",
    email: "dongbacoop@gmail.com",
    soDienThoai: "0978654654",
    trangThai: true,
  },
  {
    maNhaCungCap: "NCC3",
    tenNhaCungCap: "SIÊU THỊ CẨM THƠ",
    nhomNhaCungCap: "MACDINH",
    email: "camtho.super@gmail.com",
    soDienThoai: "0387656734",
    trangThai: false,
  },
  {
    maNhaCungCap: "NCC4",
    tenNhaCungCap: "NƯỚC NGỌT SÀI THÀNH",
    nhomNhaCungCap: "MACDINH",
    email: "saithanhdrinking@gmail.com",
    soDienThoai: "0987678654",
    trangThai: true,
  },
  {
    maNhaCungCap: "NCC5",
    tenNhaCungCap: "NƯỚC NGỌT VĨNH HẢO",
    nhomNhaCungCap: "MACDINH",
    email: "vinhhao.tphcm@gmail.com",
    soDienThoai: "0988989345",
    trangThai: true,
  },
];

const TableProvider = () => {
  // const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.productSlice);
  const [page, setPage] = React.useState(1);
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: "Mã nhà cung cấp",
      dataIndex: "maNhaCungCap",
      key: "maNhaCungCap",
      sorter: (item1, item2) => item1.maSanPham.localeCompare(item2.maSanPham),
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Nhóm nhà cung cấp",
      dataIndex: "nhomNhaCungCap",
      key: "nhomNhaCungCap",
      showOnResponse: true,
      showOnDesktop: true,
      render: (value, record) => {
        if (record.nhomNhaCungCap === "MACDINH") {
          return <div>Khác</div>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      render: (text, record, index) => {
        let colorTag = text === false ? "red" : "green";
        let contentTag = text === true ? "Đang giao dịch" : "Ngưng cung cấp";
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
        { text: "Đang giao dịch", value: true },
        { text: "Ngưng cung cấp", value: false },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.trangThai === true;
        } else {
          return record.trangThai === false;
        }
      },
    },
    {
      title: "Thao tác",
      key: "thaoTac",
      ellipsis: true,
      showOnResponse: true,
      showOnDesktop: true,
      fixed: "right",
      align: "left",
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <button
            type="button"
            className="text-white font-bold py-3 px-3 rounded inline-flex items-center edit-button"
            onClick={() => handleEditProvider(record)}
          >
            <EditFilled />
          </button>
        </Space>
      ),
    },
  ];
  const handleEditProvider = () => {};
  return (
    <>
      <TableTemplate
        columns={columns}
        dataSource={providers}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          defaultPageSize: 6,
          showSizeChanger: false,
          pageSizeOptions: ["6"],
        }}
        rowKey={"maNhaCungCap"}
      />
      {/* <ModalForm isModalOpen={isOpen} /> */}
    </>
  );
};

export default TableProvider;
