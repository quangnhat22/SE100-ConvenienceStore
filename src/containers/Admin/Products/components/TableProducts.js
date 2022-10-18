import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table, Button, Tag, Popconfirm, Space, Spin } from "antd";
import React from "react";
import ModalForm from "../../../../HOC/ModalForm";

const columns = [
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
    title: "Tên sản phẩm",
    dataIndex: "email_to_contact",
    key: "email_to_contact",
    showOnResponse: true,
    showOnDesktop: true,
    width: "15%",
    ellipsis: true,
  },
  {
    title: "Tình trạng",
    dataIndex: "fee_status",
    key: "fee_status",
    showOnResponse: true,
    showOnDesktop: true,
    ellipsis: true,
    width: "10%",
    render: (text, record, index) => {
      let colorTag = text ? "green" : "red";
      let contentTag = text ? "Còn hàng" : "Hết hàng";
      return (
        <Tag
          key={index}
          color={colorTag}
          className="w-3/4 min-w-max text-center"
        >
          {contentTag}
        </Tag>
      );
    },
    filters: [
      { text: "Còn hàng", value: true },
      { text: "Hết hàng", value: false },
    ],
    //filteredValue: filteredInfo.fee_status || null,
    onFilter: (value, record) => record.fee_status === value,
  },
  {
    title: "",
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
          //   onClick={() => handleSubmitEdit(record)}
        >
          <EditFilled />
        </button>
        <Popconfirm
          placement="top"
          title="Bạn có chắc muốn xóa đội này ?!"
          okText="Yes"
          cancelText="No"
          //   onConfirm={() => handleRemoveTeam(record)}
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
  return (
    <>
      <Table
        pagination={{ pageSize: 6, showSizeChanger: false }}
        rowKey={"id"}
        className="m-3 drop-shadow-lg"
        size="middle"
        columns={columns}
        //dataSource={teamListSearched}
        dataSource={[]}
        //onChange={handleChange}
        scroll={{ x: 1100 }}
      />
      <ModalForm />
    </>
  );
};

export default TableProducts;
