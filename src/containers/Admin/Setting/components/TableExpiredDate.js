import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import { Table, Space, Tag, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import Swal from "sweetalert2";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import DetailExpiredDateForm from "./DetailExpiredDateForm";

const TableExpiredDate = () => {
  const dispatch = useDispatch();
  const { productItemsExpire } = useSelector(
    (state) => state.productItemsExpireSlice
  );
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCT_EXPIRE_SAGA });
  });

  const [isOpen, setIsOpen] = useState(false);

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
            onClick={() => handleEdit(record)}
          >
            <EyeFilled />
          </button>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa trạng thái này?"
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
            onConfirm={() => handleRemove(record)}
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

  const handleEdit = (record) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <DetailExpiredDateForm productItemExpire={record} />,
      })
    );
  };
  const handleRemove = (record) => {
    dispatch({
      type: SagaActionTypes.DELETE_PRODUCT_EXPIRE_SAGA,
      id: record.id,
    });
  };

  return (
    <>
      <Table
        rowKey={"id"}
        className="header-style m-3 drop-shadow-lg"
        columns={columns}
        pagination={{
          defaultPageSize: 2,
          showSizeChanger: false,
          pageSizeOptions: ["2"],
        }}
        dataSource={productItemsExpire}
        scroll={{ x: 1100 }}
      />
      <ModalForm isModalOpen={isOpen} />
    </>
  );
};

export default TableExpiredDate;
