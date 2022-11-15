import React, { useState, useEffect } from "react";
import { Card, Space, DatePicker, Segmented, Table } from "antd";
import moment from "moment";
import "../../../../common/Segmented/Segmented.css";
import Chart from "./Chart";
import "../../../../common/Table/TableTemplate.css";

const { RangePicker } = DatePicker;

const DashboardPage = () => {
  const [productTypes, setProductTypes] = useState(null);
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

  //Data Demo
  const [dataTopSale, setDataTopSale] = useState([
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
  ]);

  // List Option
  const [listOptions, setOptions] = useState([
    "Hôm nay",
    "Tuần này",
    "Tháng này",
    "Năm nay",
  ]);

  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      <div className="mt-2 mx-2 md:mt-12 md:mx-12">
        <div className="flex flex-wrap justify-between gap-y-10">
          {/* Card sản phẩm */}
          <Card
            className="w-80 shadow-md"
            size="small"
            title="Sản phẩm"
            headStyle={{ fontWeight: "bold", fontSize: "18px" }}
            extra={
              <div
                /* onClick={() => handleCardProductDetail(source)} */
                className="text-blue-500 cursor-pointer hover:text-blue-600"
              >
                Chi tiết
              </div>
            }
          >
            <div className="font-bold text-2xl py-2">
              {productTypes + " loại"}
            </div>
            <div className="text-gray-400">
              {"Sắp hết hạn: " + productNearExpirationDate}
            </div>
            <div className="text-gray-400">{"Hết hàng: " + outOfStock}</div>
          </Card>
          {/* Card nhân viên */}
          <Card
            className="w-80 shadow-md"
            size="small"
            title="Nhân viên"
            headStyle={{ fontWeight: "bold", fontSize: "18px" }}
            extra={
              <div
                /* onClick={() => handleCardStaffDetail(source)} */
                className="text-blue-500 cursor-pointer hover:text-blue-600"
              >
                Chi tiết
              </div>
            }
          >
            <div className="font-bold text-2xl py-2">
              {numberOfStaff + " người"}
            </div>
          </Card>
          {/* Card tổng doanh thu */}
          <Card
            className="w-80 shadow-md"
            size="small"
            title="Tổng doanh thu"
            headStyle={{ fontWeight: "bold", fontSize: "18px" }}
            extra={
              <div
                /* onClick={() => handleCardRevenueDetail(source)} */
                className="text-blue-500 cursor-pointer hover:text-blue-600"
              >
                Chi tiết
              </div>
            }
          >
            <div className="font-bold text-2xl py-2">
              {totalRevenue + " VNĐ"}
            </div>
          </Card>
        </div>

        {/* Bảng biểu */}
        <div className="bg-white mt-10 md:mt-32 flex flex-col border-box shadow-md">
          {/* Lọc và tiêu đề */}
          <div className="flex flex-col items-center justify-end lg:flex-row border-0 border-b border-gray-200 border-solid px-5">
            <div className="inline-block text-blue-500 p-2 lg:p-0 lg:mr-auto text-xl">
              SẢN PHẨM BÁN CHẠY
            </div>
            <Space
              className="p-2 flex items-center justify-center"
              align="center"
              wrap="true"
            >
              <Segmented
                options={listOptions}
                defaultValue="Hôm nay"
                disabled={isDisabled}
              />
              {/* Lọc ngày tháng */}
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [
                    moment().startOf("month"),
                    moment().endOf("month"),
                  ],
                }}
                placeholder={["Thời điểm bắt đầu", "Thời điểm kết thúc"]}
              />
            </Space>
          </div>

          {/* Biểu đồ */}
          <div className="m-5 box-border flex flex-wrap gap-y-10 gap-x-20">
            <div className="mr-auto inline-block flex flex-col grow gap-y-10">
              <div className="text-lg font-bold">Xu hướng bán chạy</div>
              <Chart />
            </div>
            <div className="inline-block flex flex-col grow w-fit">
              <div className="text-lg font-bold">Bảng xếp hạng</div>
              <Table
                className="customTable w-fit mt-2"
                rowKey={"id"}
                size="small"
                showHeader={false}
                pagination={false}
                columns={columnsTopSale}
                dataSource={dataTopSale.slice(dataTopSale.length - 10)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
