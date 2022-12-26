import { DeleteFilled, EyeOutlined } from "@ant-design/icons";
import { Space, Popconfirm, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { providerActions } from "../../../../redux/reducer/ProviderReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import DetailProviderPage from "./DetailProvider/DetailProviderPage";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import { type } from "@testing-library/user-event/dist/type";

const TableProviders = ({ data, keyWord, loading }) => {
  const dispatch = useDispatch();
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
      dataIndex: "id",
      key: "id",
      sorter: (item1, item2) => item1.maSanPham.localeCompare(item2.maSanPham),
      showOnResponse: true,
      showOnDesktop: true,
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.address).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "name",
      key: "name",
      sorter: (item1, item2) => item1.name.localeCompare(item2.name),
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      showOnResponse: true,
      showOnDesktop: true,
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "trangThai",
    //   key: "trangThai",
    //   showOnResponse: true,
    //   showOnDesktop: true,
    //   ellipsis: true,
    //   render: (text, record, index) => {
    //     let colorTag = text === false ? "red" : "green";
    //     let contentTag = text === true ? "Đang giao dịch" : "Ngưng cung cấp";
    //     return (
    //       <Tag
    //         key={index}
    //         color={colorTag}
    //         className="w-2/4 min-w-max text-center"
    //       >
    //         {contentTag}
    //       </Tag>
    //     );
    //   },
    //   filters: [
    //     { text: "Đang giao dịch", value: true },
    //     { text: "Ngưng cung cấp", value: false },
    //   ],
    //   onFilter: (value, record) => {
    //     if (value === true) {
    //       return record.trangThai === true;
    //     } else {
    //       return record.trangThai === false;
    //     }
    //   },
    // },
    {
      title: "Thao tác",
      key: "action",
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
            <EyeOutlined />
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
            onConfirm={() => handleRemoveProviders(record)}
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

  const handleEditProvider = (record) => {
    // dispatch(
    //   modalActions.showModal({
    //     ComponentContent: (
    //       <DetailProviderPage provider={record}></DetailProviderPage>
    //     ),
    //   })
    // );
  };
  const handleRemoveProviders = (record) => {
    dispatch({ type: SagaActionTypes.DELETE_PROVIDER_SAGA, id: record.id });
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

export default TableProviders;
