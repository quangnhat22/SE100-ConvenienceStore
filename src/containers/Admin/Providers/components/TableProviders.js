import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Space, Popconfirm } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { providerActions } from "../../../../redux/reducer/ProviderReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import DetailProviderForm from "./DetailProviderForm";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const TableProviders = (props) => {
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.providerSlice);
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
            onConfirm={() => handleRemoveProvider(record)}
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

  const handleEditProvider = (provider) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: (
          <DetailProviderForm provider={provider}></DetailProviderForm>
        ),
      })
    );
  };
  const handleRemoveProvider = (record) => {
    dispatch({ type: SagaActionTypes.DELETE_PROVIDER, record });
  };

  return (
    <>
      <TableTemplate
        columns={columns}
        dataSource={providers}
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
