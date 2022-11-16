import { hover } from "@testing-library/user-event/dist/hover";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Table, Tag, Popconfirm, Space, Tooltip } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: "Mã quy định",
    dataIndex: "maQuyDinh",
    key: "maQuyDinh",
    width: "6%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Tên quy định",
    dataIndex: "tenQuyDinh",
    key: "tenQuyDinh",
    width: "20%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
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
      </Space>
    ),
  },
];

const TableOtherRegulation = () => {
  const dispatch = useDispatch();
  const { othersRegulation } = useSelector((state) => state.regulationSlice);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Table
        //pagination={{ pageSize: 3, showSizeChanger: false }}
        pagination={false} 
        rowKey={"id"}
        className="header-style m-3 drop-shadow-lg"
        size="middle"
        columns={columns}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        dataSource={othersRegulation}
        //  onChange={handleChange}
        scroll={{ x: 1100 }}
      />
      <ModalForm isModalOpen={isOpen} />
    </>
  );
};

export default TableOtherRegulation;