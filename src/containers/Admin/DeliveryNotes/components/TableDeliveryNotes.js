import { Table, Popconfirm, Space, Spin } from "antd";
import moment from "moment";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import ModalForm from "../../../../HOC/ModalForm";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import { staffActions } from "../../../../redux/reducer/StaffReducer";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const TableDeliveryNotes = ({ keyWord, data, loading }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: "5%",
      key: "",
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: "Mã nhập hàng",
      dataIndex: "id",
      key: "id",
      width: "10%",
      //defaultSortOrder: ["descend"],
      // sorter: (item1, item2) => item1.id.localeCompare(item2.id),
      sorter: (a, b) => a.id - b.id,
      //sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.provider.name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(moment(record.date).format("DD/MM/YYYY"))
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.total).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: ["provider", "name"],
      key: "provider",
      width: "15%",
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (item1, item2) =>
        item1.provider.name.localeCompare(item2.provider.name),
    },
    {
      title: "Ngày nhập",
      dataIndex: "date",
      key: "date",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (date) => `${moment(date).format("DD/MM/YYYY")}`,
    },
    // {
    //   title: "Tổng sản phẩm",
    //   dataIndex: "productItems",
    //   key: "productItems",
    //   showOnResponse: true,
    //   showOnDesktop: true,
    //   width: "15%",
    //   ellipsis: true,
    //   render: (productItems) => {
    //     let render = 0;
    //     for (let i = 0; i < productItems.length; i++) {
    //       render += productItems[i].quantity;
    //     }
    //     return render;
    //   },
    // },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      showOnResponse: true,
      showOnDesktop: true,
      width: "15%",
      ellipsis: true,
      sorter: (a, b) => a.total - b.total,
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
          {/* <button
            type="button"
            className="text-white font-bold py-3 px-3 rounded inline-flex items-center edit-button"
            onClick={() => handleEditStaff(record)}
          >
            <EditFilled />
          </button> */}
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa phiếu nhập hàng này?"
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
            onConfirm={() => handleRemoveDeliveryNote(record)}
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

  const handleRemoveDeliveryNote = (deliveryNote) => {
    dispatch({
      type: SagaActionTypes.DELETE_DELIVERY_NOTES_SAGA,
      id: deliveryNote.id,
    });
  };

  // const handleEditStaff = (staff) => {
  //   dispatch(
  //     modalActions.showModal({
  //       ComponentContent: <StaffInforDetail staff={staff}></StaffInforDetail>,
  //     })
  //   );
  // };
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
        dataSource={data}
        columns={columns}
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
      {/* <ModalForm isModalOpen={isOpen} /> */}
    </>
  );
};

export default TableDeliveryNotes;
