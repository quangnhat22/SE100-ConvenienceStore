import { hover } from "@testing-library/user-event/dist/hover";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table, Tag, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "STT",
    dataIndex: "",
    width: "5%",
    key: "",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Mã trạng thái",
    dataIndex: "maTrangThai",
    key: "maTrangThai",
    width: "10%",
    //defaultSortOrder: ["descend"],
    sorter: (item1, item2) => item1.id.localeCompare(item2.id),
    //sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Tên trạng thái",
    dataIndex: "tenTrangThai",
    key: "tenTrangThai",
    width: "10%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Giá trị tối thiểu",
    dataIndex: "Giá trị tối đa",
    key: "giaNhap",
    width: "10%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Giá trị tối đa",
    dataIndex: "Giá trị tối đa",
    key: "giaNhap",
    width: "10%",
    showOnResponse: true,
    showOnDesktop: true,
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

const TableRegulation = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productSlice);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Table
        pagination={{ pageSize: 3, showSizeChanger: false }}
        locale={{
          triggerDesc: "Nhấp để sắp xếp giảm dần",
          triggerAsc: "Nhấp để sắp xếp tăng dần",
          cancelSort: "Trở về mặc định",
        }}
        rowKey={"id"}
        className="header-style m-3 drop-shadow-lg"
        size="middle"
        columns={columns}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        dataSource={products}
        //  onChange={handleChange}
        scroll={{ x: 1100 }}
      />
      <ModalForm isModalOpen={isOpen} />
    </>
  );
};

export default TableRegulation;
