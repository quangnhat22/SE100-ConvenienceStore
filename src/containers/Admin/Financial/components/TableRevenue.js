import { Space, Spin, Table, Typography } from "antd";
import React, { useState } from "react";
import TableTemplate from "../../../../common/Table/TableTemplate";

const TableRevenue = ({ keyWord, data, loading }) => {
  const { Text } = Typography;
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
      title: "Mã dòng sản phẩm",
      dataIndex: ["product", "id"],
      key: "id",
      width: "10%",
      //defaultSortOrder: ["descend"],
      // sorter: (item1, item2) => item1.id.localeCompare(item2.id),
      // sorter: (a, b) => a.id - b.id,
      //sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.product.id)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.product.title)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.revenue).toLowerCase().includes(value.toLowerCase()) ||
          String(record.quantity).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên dòng sản phẩm",
      dataIndex: ["product", "title"],
      key: "title",
      width: "30%",
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (item1, item2) =>
        item1.product.title.localeCompare(item1.product.title),
    },
    {
      title: "Thuế",
      dataIndex: ["product", "tax"],
      key: "tax",
      width: "5%",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Số lượng bán ra",
      dataIndex: "quantity",
      key: "quantity",
      showOnResponse: true,
      showOnDesktop: true,
      width: "10%",
      ellipsis: true,
      sorter: (a, b) => a.quantity - b.quantity,
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
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      showOnResponse: true,
      showOnDesktop: true,
      width: "10%",
      ellipsis: true,
      fixed: "right",
      sorter: (a, b) => a.revenue - b.revenue,
      render: (text, record, index) => {
        return (
          <div>
            {record.revenue
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profit",
      key: "profit",
      showOnResponse: true,
      showOnDesktop: true,
      width: "10%",
      ellipsis: true,
      fixed: "right",
      sorter: (a, b) => a.profit - b.profit,
      render: (text, record, index) => {
        return (
          <div>
            {record.profit
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            <sup>đ</sup>
          </div>
        );
      },
    },
  ];

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
      scroll={{ x: 1100 }}
      summary={(data) => {
        let totalRevenue = 0;
        let totalProfit = 0;
        data.forEach(({ revenue, profit }) => {
          totalRevenue += revenue;
          totalProfit += profit;
        });
        return (
          <Table.Summary.Row fixed>
            <Table.Summary.Cell colSpan={5}>
              <div className="w-full text-center text-2xl">Tổng:</div>
            </Table.Summary.Cell>
            <Table.Summary.Cell>
              <div className="text-2xl">
                {totalRevenue
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                <sup>đ</sup>
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell>
              <Text className="text-2xl" type="success">
                <div>
                  {totalProfit
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  <sup>đ</sup>
                </div>
              </Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
};

export default TableRevenue;
