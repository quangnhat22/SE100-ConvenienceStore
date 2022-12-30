import React, { useState } from "react";
import TableTemplate from "../../../../common/Table/TableTemplate";

const TableInvoice = ({ listItem }) => {
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
      title: "Mã sản phẩm",
      dataIndex: ["productItem", "id"],
      key: "id",
      width: "20%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên dòng sản phẩm",
      dataIndex: ["productItem", "product", "title"],
      key: "title",
      width: "20%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      width: "20%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        return (
          <div>
            {record.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: "20%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        return (
          <div>
            {record.quantity
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        );
      },
    },
    {
      title: "VAT",
      dataIndex: ["productItem", "product", "tax"],
      key: "tax",
      width: "20%",
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => {
        return <div>{text + "%"}</div>;
      },
    },
    {
      title: "Thành tiền",
      showOnResponse: true,
      showOnDesktop: true,
      width: "20%",
      fixed: "right",
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <div>
            {Number.parseFloat(
              record.price *
                record.quantity *
                (1 + record.productItem.product.tax / 100)
            )
              .toFixed(3)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
    },
  ];

  return (
    <TableTemplate
      className="mt-10"
      dataSource={listItem}
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
