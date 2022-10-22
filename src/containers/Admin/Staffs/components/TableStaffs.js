import { Table, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import "../../Products/components/TableProducts.css";

const columns = [
  {
    title: "STT",
    dataIndex: "",
    width: "5%",
    key: "",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Mã nhân viên",
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
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
    width: "15%",
    showOnResponse: true,
    showOnDesktop: true,
    sorter: (item1, item2) => item1.id.localeCompare(item2.id),
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
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
        <div className=" hover:cursor-pointer hover:text-blue-600 text-blue-500 inline-flex">
          Xem chi tiết
        </div>
        <Popconfirm
          placement="top"
          title="Bạn có chắc muốn xóa nhân viên này?"
          okText="Xác nhận"
          cancelText="Hủy"
          //   onConfirm={() => handleRemoveStaff(record)}
        >
          <div className="hover:text-red-700 hover:underline hover:cursor-pointer text-red-500 inline-flex align-center">
            Xóa
          </div>
        </Popconfirm>
      </Space>
    ),
  },
];

const TableStaffs = () => {
  // Data Demo
  const [dataSource, setDataSource] = useState([
    {
      id: `NV1`,
      name: `Nguyễn Quang Hải`,
      phone: "0986668886",
      email: "haicon@gmail.com",
    },
    {
      id: `NV2`,
      name: `Nguyễn Công Phượng`,
      phone: "0358546654",
      email: "phuong1m6@gmail.com",
    },
    {
      id: `NV3`,
      name: `Đặng Văn Lâm`,
      phone: "0335680919",
      email: "lamtay@gmail.com",
    },
    {
      id: `NV4`,
      name: `Đỗ Hùng Dũng`,
      phone: "0862836475",
      email: "dungnhieutien@gmail.com",
    },
    {
      id: `NV5`,
      name: `Nguyễn Hoàng Đức`,
      phone: "0358263549",
      email: "ducsatgai@gmail.com",
    },
    {
      id: `NV6`,
      name: `Trần Đình Trọng`,
      phone: "0949876866",
      email: "trongdeptrai@gmail.com",
    },
    {
      id: `NV7`,
      name: `Quế Ngọc Hải`,
      phone: "0396453726",
      email: "haibodoi@gmail.com",
    },
    {
      id: `NV8`,
      name: `Hồ Tấn Tài`,
      phone: "0387635473",
      email: "taikhongdoituoi@gmail.com",
    },
  ]);

  return (
    <>
      <Table
        pagination={{ pageSize: 12, showSizeChanger: false }}
        rowKey={"id"}
        className="header-style m-3 drop-shadow-lg"
        size="middle"
        columns={columns}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        //dataSource={staffListSearched}
        dataSource={dataSource}
        //onChange={handleChange}
        scroll={{ x: 1100 }}
      />
      <ModalForm />
    </>
  );
};

export default TableStaffs;
