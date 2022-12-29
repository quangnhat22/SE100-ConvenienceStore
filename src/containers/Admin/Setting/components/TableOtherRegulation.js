import { EyeFilled } from "@ant-design/icons";
import { Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import OtherRegulationForm from "./OtherRegulationForm";

const TableOtherRegulation = () => {
  const dispatch = useDispatch();
  const { vat } = useSelector((state) => state.vatSlice);
  useEffect(() => {
    dispatch({type: SagaActionTypes.GET_VAT_SAGA})
  }, []);
  console.log(vat);
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      title: "Mã quy định",
      dataIndex: "id",
      key: "id",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên quy định",
      render: () => {
        return (<div>VAT</div>);
      },
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
            onClick={() => handleEditRegulation(record)}
          >
            <EyeFilled />
          </button>
        </Space>
      ),
    },
  ];

  const handleEditRegulation = (record) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <OtherRegulationForm vat={record} />,
      })
    );
  };

  return (
    <>
      <Table
        pagination={false}
        rowKey={"id"}
        className="header-style m-3 drop-shadow-lg"
        columns={columns}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        dataSource={[vat]}
        scroll={{ x: 1100 }}
      />
      <ModalForm isModalOpen={isOpen} />
    </>
  );
};

export default TableOtherRegulation;
