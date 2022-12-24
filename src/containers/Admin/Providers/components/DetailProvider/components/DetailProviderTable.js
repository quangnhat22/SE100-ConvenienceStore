import { useState } from "react";
import TableTemplate from "../../../../../../common/Table/TableTemplate";
import moment from "moment";
import { Popconfirm, Space, Spin } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import * as SagaActionTypes from "../../../../../../redux/constants/constant";
import { useDispatch } from "react-redux";

const DetailProviderTable = ({ data, keyWord, loading }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: "Mã dòng sản phẩm",
      dataIndex: "id",
      key: "id",
      sorter: (item1, item2) => item1.id.localeCompare(item2.maDongSanPham),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.title).toLowerCase().includes(value.toLowerCase()) ||
          String(`${record.tax}%`).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên dòng sản phẩm",
      dataIndex: "title",
      key: "title",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Thuế",
      dataIndex: "tax",
      key: "tax",
      showOnResponse: true,
      showOnDesktop: true,
      render: (value, record) => {
        return <div>{record.tax + "%"}</div>;
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
            onConfirm={() => handleRemoveProductLine(record)}
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

  const handleRemoveProductLine = (record) => {
    dispatch({
      type: SagaActionTypes.DELETE_PRODUCTS_SAGA,
      id: record.id,
    });
  };

  if (loading === true) {
    return (
      <div className="w-full flex items-center justify-center mb-12 h-4/5">
        <Space size="middle ">
          <Spin size="large" tip="Loading..." />
        </Space>
      </div>
    );
  }
  return (
    <>
      <TableTemplate
        columns={columns}
        dataSource={data}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          defaultPageSize: 6,
          showSizeChanger: false,
          pageSizeOptions: ["6"],
        }}
        rowKey={"id"}
      />
    </>
  );
};

export default DetailProviderTable;
