import { EditFilled } from "@ant-design/icons";
import { Space, Spin, Tooltip } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TableTemplate from "../../../../common/Table/TableTemplate";
import { modalActions } from "../../../../redux/reducer/ModalReducer";
import InfoCreatorForm from "./InfoCreatorForm";
import TableContentInvoice from "./TableContentInvoice";

const TableInvoice = ({ keyWord, data, loading }) => {
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
      title: "Mã hóa đơn",
      dataIndex: "id",
      key: "id",
      width: "20%",
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.total).toLowerCase().includes(value.toLowerCase()) ||
          String(moment(record.date).format("DD/MM/YYYY"))
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.creator.fullname)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Ngày lập",
      dataIndex: "date",
      key: "date",
      width: "20%",
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (item1, item2) => item1.date > item2.date,
    },
    {
      title: "Người lập",
      dataIndex: ["creator", "fullname"],
      key: "fullname",
      width: "20%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        return (
          <Tooltip title="Nhấp để xem thông tin">
            <div
              className="hover:cursor-pointer hover:text-blue-600 w-fit"
              onClick={() => handleViewCreator(record.creator)}
            >
              {record.creator.fullname}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      showOnResponse: true,
      showOnDesktop: true,
      width: "20%",
      ellipsis: true,
      sorter: (a, b) => a.total - b.total,
      render: (text, record, index) => {
        return (
          <div>
            {record.total
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
    },
    {
      title: "Nội dung",
      key: "content",
      width: "10%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => (
        <Tooltip title="Nhấp để xem hóa đơn">
          <Space size="middle" key={index}>
            <button
              type="button"
              className="text-white font-bold py-3 px-3 rounded inline-flex items-center edit-button"
              onClick={() => handleViewContent(record.invoiceDetails)}
            >
              <EditFilled />
            </button>
          </Space>
        </Tooltip>
      ),
    },
  ];

  const handleViewContent = (invoiceDetails) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <TableContentInvoice listItem={invoiceDetails} />,
      })
    );
  };

  const handleViewCreator = (creator) => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <InfoCreatorForm creator={creator} />,
      })
    );
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
  );
};

export default TableInvoice;
