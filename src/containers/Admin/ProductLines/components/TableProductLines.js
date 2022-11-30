import { useState } from "react";
import TableTemplate from "../../../../common/Table/TableTemplate";
import moment from "moment";
import ModalForm from "../../../../HOC/ModalForm";

const TableProductLines = ({ data }) => {
  console.log("data: ", data);
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
      title: "Thuế (VAT)",
      dataIndex: "tax",
      key: "tax",
      showOnResponse: true,
      showOnDesktop: true,
      render: (value, record) => {
        return <div>{record.tax + "%"}</div>;
      },
    },
  ];
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
        rowKey={"maDongSanPham"}
      />
    </>
  );
};

export default TableProductLines;
