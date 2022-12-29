import { EyeFilled } from "@ant-design/icons";
import { Table, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const columns = [
  {
    title: "Mã quy định",
    dataIndex: "id",
    key: "id",
    width: "6%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Tên quy định",
    dataIndex: "stateName",
    key: "stateName",
    width: "20%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Giá trị",
    dataIndex: "val",
    key: "val",
    width: "10%",
    showOnResponse: true,
    showOnDesktop: true,
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
    key: "color",
    width: "10%",
    showOnResponse: true,
    showOnDesktop: true,
    render: (text, record, index) => {
      return (
        <Tag key={index} color={text} className="w-2/4 min-w-max text-center">
          {record.stateName}
        </Tag>
      );
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
          //   onClick={() => handleViewProduct(record)}
        >
          <EyeFilled />
        </button>
      </Space>
    ),
  },
];

const TableExpiredDate = () => {
  const dispatch = useDispatch();
  const { productItemsExpire } = useSelector(
    (state) => state.productItemsExpireSlice
  );
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCT_EXPIRE_SAGA });
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Table
        pagination={false}
        rowKey={"id"}
        className="header-style m-3 drop-shadow-lg"
        size="middle"
        columns={columns}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        dataSource={productItemsExpire}
        scroll={{ x: 1100 }}
      />
      <ModalForm isModalOpen={isOpen} />
    </>
  );
};

export default TableExpiredDate;
