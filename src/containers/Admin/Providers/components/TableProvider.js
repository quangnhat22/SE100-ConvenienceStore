import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Tag, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useHistory } from "react-router-dom";
import { providerActions } from "../../../../redux/reducer/ProviderReducer";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import DetailProviderForm from "./DetailProviderForm";

const TableProvider = (props) => {
  const dispatch = useDispatch();
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
      showOnResponse: true,
      showOnDesktop: true,
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

  const handleEditProvider = (provider) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: (
          <DetailProviderForm provider={provider}></DetailProviderForm>
        ),
      })
    );
  };
  const handleRemoveProviders = (provider) => {
    dispatch(providerActions.removeProduct(provider));
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
