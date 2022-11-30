import { Table, Popconfirm, Space } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import { staffActions } from "../../../../redux/reducer/StaffReducer";
import StaffInforDetail from "./StaffInforDetail";

const TableStaffs = () => {
  const dispatch = useDispatch();
  const { staffs } = useSelector((state) => state.staffsSlice);
  const [page, setPage] = React.useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: "5%",
      key: "",
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: "Mã nhân viên",
      dataIndex: "id",
      key: "id",
      width: "10%",
      //defaultSortOrder: ["descend"],
      sorter: (item1, item2) =>
        item1.maNhanVien.localeCompare(item2.maNhanVien),
      //sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      width: "15%",
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (item1, item2) => item1.hoTen.localeCompare(item2.hoTen),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      showOnResponse: true,
      showOnDesktop: true,
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Thao tác",
      key: "action",
      id: "action",
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
            onClick={() => handleEditStaff(record)}
          >
            <EditFilled />
          </button>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa nhân viên này?"
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
            onConfirm={() => handleRemoveStaff(record)}
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

  const handleRemoveStaff = (staff) => {
    dispatch(staffActions.removeStaffs(staff));
  };

  const handleEditStaff = (staff) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <StaffInforDetail staff={staff}></StaffInforDetail>,
      })
    );
  };

  return (
    <>
      <TableTemplate
        dataSource={staffs}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          defaultPageSize: 6,
          showSizeChanger: false,
          pageSizeOptions: ["6"],
        }}
        rowKey={"maNhanVien"}
      />
      {/* <ModalForm isModalOpen={isOpen} /> */}
    </>
  );
};

export default TableStaffs;
