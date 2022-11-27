
import { EditFilled } from "@ant-design/icons";
import { Tag, Space } from "antd";
import React, { useState } from "react";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useHistory } from "react-router-dom";

const TableProvider = (props) => {
  // const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.productSlice);
  const history = useHistory();
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

  const handleEditProvider = (record) => {
    history.push("/detail_provider/" + record.maNhaCungCap);
  };

  return (
    <>
      <TableTemplate
        columns={columns}
        dataSource={props.listProviders}
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
