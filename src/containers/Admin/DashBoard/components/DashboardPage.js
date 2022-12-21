import React, { useState, useEffect } from "react";
import { Card, Space, DatePicker, Segmented, Table } from "antd";
import moment from "moment";
import "../../../../common/Segmented/Segmented.css";
import PieChart from "./PieChart";
import "../../../../common/Table/TableTemplate.css";
import { Link } from "react-router-dom";

//Data Demo

const dataRevenue = [
  {
    name: "Doanh thu",
    number: 8604000,
  },
  {
    name: "Chi phí",
    number: 4500000,
  },
  {
    name: "Phí tổn",
    number: 120000,
  },
];
const dataTopSale = [
  {
    id: 1,
    name: "Bánh tráng",
    number: 124,
  },
  {
    id: 2,
    name: "Cải",
    number: 122,
  },
  {
    id: 3,
    name: "Snack bí đỏ",
    number: 100,
  },
  {
    id: 4,
    name: "Kem chuối",
    number: 96,
  },
  {
    id: 5,
    name: "Nước suối",
    number: 84,
  },
  {
    id: 6,
    name: "Kem dừa",
    number: 67,
  },
  {
    id: 7,
    name: "Nước tăng lực redbull",
    number: 50,
  },
  {
    id: 8,
    name: "Pepsi",
    number: 45,
  },
  {
    id: 9,
    name: "Coca Cola",
    number: 40,
  },
  {
    id: 10,
    name: "Cool air",
    number: 35,
  },
  {
    id: 11,
    name: "Cool air",
    number: 35,
  },
  {
    id: 12,
    name: "Cool air",
    number: 35,
  },
];

const DashboardPage = () => {
  const [productNearExpirationDate, setProductNearExpirationDate] =
    useState(null);
  const [outOfStock, setOutOfStock] = useState(null);
  const [numberOfStaff, setNumberOfStaff] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);

  const columnsTopSale = [
    {
      align: "left",
      render: (text, record, index) => {
        return (
          <div className="bg-red-400 w-7 h-7 rounded-full flex items-center justify-center">
            {index + 1}
          </div>
        );
      },
    },
    {
      dataIndex: "name",
      key: "name",
    },
    {
      dataIndex: "number",
      key: "number",
    },
  ];

  return (
    <>
      <div className="mt-2 mx-2 md:mt-6 md:mx-12">
        <div className="flex flex-wrap justify-between gap-y-10">
          {/* Card sản phẩm */}
          <Card
            className="w-80 shadow-md rounded"
            size="small"
            title="Sản phẩm"
            headStyle={{ fontWeight: "bold", fontSize: "25px" }}
            extra={
              <Link
                /* onClick={() => handleCardProductDetail(source)} */
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                to="products"
              >
                Chi tiết
              </Link>
            }
          >
            {/* <div className="font-bold text-2xl py-2">
              {productTypes + " loại"}
            </div> */}
            <div className="text-yellow-400 opacity-80 font-bold text-lg py-2">
              {"Sắp hết hạn: "}
              <span class="text-lg text-black">
                {productNearExpirationDate}
              </span>
            </div>
            <div className="text-red-500 font-bold text-lg py-2">
              {"Hết hàng: "}
              <span class="text-lg text-black">{outOfStock}</span>
            </div>
          </Card>

          {/* Card nhân viên */}
          <Card
            className="w-80 shadow-md rounded"
            size="small"
            title="Nhân viên"
            headStyle={{ fontWeight: "bold", fontSize: "25px" }}
            extra={
              <Link
                /* onClick={() => handleCardStaffDetail(source)} */
                to="/staffs"
                className="text-blue-500 cursor-pointer hover:text-blue-600"
              >
                Chi tiết
              </Link>
            }
          >
            <div className="font-bold text-lg py-2">
              {numberOfStaff + " người"}
            </div>
          </Card>

          {/* Card tổng doanh thu */}
          <Card
            className="w-80 shadow-md rounded"
            size="small"
            title="Tổng doanh thu"
            headStyle={{ fontWeight: "bold", fontSize: "25px" }}
            extra={
              <Link
                /* onClick={() => handleCardRevenueDetail(source)} */
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                to="financial"
              >
                Chi tiết
              </Link>
            }
          >
            <div className="font-bold text-lg py-2">
              {totalRevenue + " VNĐ"}
            </div>
          </Card>
        </div>
        {/* Bảng biểu */}
        <div className="bg-white mt-10 md:mt-12 flex flex-col border-box shadow-md">
          {/* Biểu đồ */}
          <div className="m-5 box-border flex flex-wrap gap-y-10 gap-x-32">
            <div className="mr-x6-scroll-box-auto-hide flex flex-col grow gap-y-10">
              <div className="flex justify-end items-center">
                <span className="text-lg font-bold inline-block mr-auto">
                  Doanh thu tháng này
                </span>
                <span className="inline-block ml-5">
                  <Link
                    /* onClick={() => handleCardProductDetail(source)} */
                    className="text-blue-500 cursor-pointer hover:text-blue-600 hover:underline"
                    to="financial"
                  >
                    Xem thêm
                  </Link>
                </span>
              </div>
              <PieChart data={dataRevenue} />
            </div>
            <div className="flex flex-col grow">
              <div className="flex justify-start items-center">
                <span className="text-lg font-bold inline-block">
                  Bán chạy trong tuần
                </span>
              </div>
              <Table
                className="customTable mt-2"
                rowKey={"id"}
                size="small"
                showHeader={false}
                pagination={false}
                columns={columnsTopSale}
                dataSource={dataTopSale.slice(0, 10)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
