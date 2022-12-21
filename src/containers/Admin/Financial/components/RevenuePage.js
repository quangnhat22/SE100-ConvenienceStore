import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Select, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import RevenueChart from "./RevenueChart";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const { Option } = Select;
const data = [
  {
    name: "Doanh thu",
    time: "Quý 1",
    number: 18.9,
  },
  {
    name: "Doanh thu",
    time: "Quý 2",
    number: 28.8,
  },
  {
    name: "Doanh thu",
    time: "Quý 3",
    number: 39.3,
  },
  {
    name: "Doanh thu",
    time: "Quý 4",
    number: 81.4,
  },
  {
    name: "Chi phí",
    time: "Quý 1",
    number: 12.4,
  },
  {
    name: "Chi phí",
    time: "Quý 2",
    number: 23.2,
  },
  {
    name: "Chi phí",
    time: "Quý 3",
    number: 34.5,
  },
  {
    name: "Chi phí",
    time: "Quý 4",
    number: 99.7,
  },
  {
    name: "Phí tổn",
    time: "Quý 1",
    number: 75.4,
  },
  {
    name: "Phí tổn",
    time: "Quý 2",
    number: 65.2,
  },
  {
    name: "Phí tổn",
    time: "Quý 3",
    number: 43.5,
  },
  {
    name: "Phí tổn",
    time: "Quý 4",
    number: 67.7,
  },
];
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

const RevenuePage = () => {
  const [profit, setProfit] = useState(3984000);
  const [capitalLoss, setCapitalLoss] = useState(0);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  useEffect(() => {}, []);

  return (
    <div>
      {/* Option */}
      <Space className="flex justify-between border-b p-5">
        <div className="inline-block content-around font-bold text-xl ml-5">
          Bảng doanh thu
        </div>
        <Space className="whitespace-nowrap">
          <span className="bg-slate-200">Tuần:</span>
          <span className="bg-slate-200">Tháng:</span>
          <span className="bg-slate-200">Năm:</span>
        </Space>
      </Space>
      <div className="flex flex-row justify-end items-center p-2 text-gray-500 opacity-80 italic cursor-default">
        {"Dữ liệu đươc cập nhật lần cuối lúc: " +
          moment(new Date()).format("DD/MM/YYYY  HH:MM")}
      </div>

      {/* Biểu đồ */}
      <div className="flex flex-wrap justify-center items-center gap-x-10">
        <div className="p-5 inline-block grow min-w-[400px]">
          <RevenueChart data={data} />
        </div>
        <div className="inline-block min-w-[600px]">
          <PieChart data={dataRevenue} />
        </div>
      </div>

      {/* Tổng kết */}
      <div className="mt-10 flex flex-wrap justify-around gap-x-10 border text-2xl p-5">
        <span className="text-green-500 flex justify-center items-center">
          <ArrowUpOutlined className="px-2" />
          {"Lợi nhuận: " +
            profit.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
            " VNĐ"}
        </span>
        <span className="text-red-500 flex justify-center items-center">
          <ArrowDownOutlined className="px-2" />
          {"Lỗ vốn: " +
            capitalLoss
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
            " VNĐ"}
        </span>
      </div>
    </div>
  );
};

export default RevenuePage;
