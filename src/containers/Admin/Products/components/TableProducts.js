import { hover } from "@testing-library/user-event/dist/hover";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table, Tag, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";

const columns = [
  {
    title: "STT",
    dataIndex: "",
    width: "5%",
    key: "",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "id",
    key: "id",
    width: "10%",
    //defaultSortOrder: ["descend"],
    sorter: (item1, item2) => item1.id.localeCompare(item2.id),
    //sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    width: "10%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Giá nhập",
    dataIndex: "import_price",
    key: "import_price",
    width: "10%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Giá bán",
    dataIndex: "sale_price",
    key: "sale_price",
    showOnResponse: true,
    showOnDesktop: true,
    width: "15%",
    ellipsis: true,
  },
  {
    title: "Số lượng",
    dataIndex: "quantum",
    key: "quantum",
    showOnResponse: true,
    showOnDesktop: true,
    width: "10%",
    ellipsis: true,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    showOnResponse: true,
    showOnDesktop: true,
    ellipsis: true,
    width: "10%",
    render: (text, record, index) => {
      let colorTag = text === 0 ? "red" : text === 1 ? "green" : "yellow";
      let contentTag =
        text === 0 ? "Hết hàng" : text === 1 ? "Còn hàng" : "Sắp hết hàng";
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
      { text: "Còn hàng", value: 1 },
      { text: "Sắp hết hàng", value: 2 },
      { text: "Hết hàng", value: 0 },
    ],
    //filteredValue: filteredInfo.fee_status || null,
    onFilter: (value, record) => record.status === value,
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
          //   onClick={() => handleViewProduct(record)}
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
          //   onConfirm={() => handleRemoveProduct(record)}
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

const TableProducts = () => {
  // Data Demo
  const [dataSource, setDataSource] = useState([
    {
      id: `A1`,
      name: `Sản phẩm 1`,
      import_price: 26000,
      sale_price: 30000,
      quantum: 19,
      vat: "10",
      status: 2,
    },
    {
      id: `A2`,
      name: `Sản phẩm 2`,
      import_price: 90000,
      sale_price: 100000,
      quantum: 23,
      vat: "10",
      status: 1,
    },
    {
      id: `A3`,
      name: `Sản phẩm 3`,
      import_price: 16000,
      sale_price: 18000,
      quantum: 101,
      vat: "10",
      status: 1,
    },
    {
      id: `A4`,
      name: `Sản phẩm 4`,
      import_price: 27000,
      sale_price: 31000,
      quantum: 59,
      vat: "10",
      status: 1,
    },
    {
      id: `A5`,
      name: `Sản phẩm 5`,
      import_price: 28000,
      sale_price: 32000,
      quantum: 0,
      vat: "10",
      status: 0,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableTemplate columns={columns} dataSource={dataSource} />
      <ModalForm isModalOpen={isOpen} />
    </>
  );
};

export default TableProducts;
