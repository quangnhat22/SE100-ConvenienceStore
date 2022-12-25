import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { DatePicker, Select, Space } from "antd";
import moment from "moment";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import TableRevenue from "./TableRevenue";
import { Segmented } from "antd";
// import dayjs from "dayjs";
// import "dayjs/locale/zh-cn";
// import "dayjs/plugin/updateLocale";

// dayjs.updateLocale("zh-cn", {
//   weekStart: 1,
// });

const { Option } = Select;
// const data = [
//   {
//     name: "Doanh thu",
//     time: "Quý 1",
//     number: 18.9,
//   },
//   {
//     name: "Doanh thu",
//     time: "Quý 2",
//     number: 28.8,
//   },
//   {
//     name: "Doanh thu",
//     time: "Quý 3",
//     number: 39.3,
//   },
//   {
//     name: "Doanh thu",
//     time: "Quý 4",
//     number: 81.4,
//   },
//   {
//     name: "Chi phí",
//     time: "Quý 1",
//     number: 12.4,
//   },
//   {
//     name: "Chi phí",
//     time: "Quý 2",
//     number: 23.2,
//   },
//   {
//     name: "Chi phí",
//     time: "Quý 3",
//     number: 34.5,
//   },
//   {
//     name: "Chi phí",
//     time: "Quý 4",
//     number: 99.7,
//   },
//   {
//     name: "Phí tổn",
//     time: "Quý 1",
//     number: 75.4,
//   },
//   {
//     name: "Phí tổn",
//     time: "Quý 2",
//     number: 65.2,
//   },
//   {
//     name: "Phí tổn",
//     time: "Quý 3",
//     number: 43.5,
//   },
//   {
//     name: "Phí tổn",
//     time: "Quý 4",
//     number: 67.7,
//   },
// ];
// const dataRevenue = [
//   {
//     name: "Doanh thu",
//     number: 8604000,
//   },
//   {
//     name: "Chi phí",
//     number: 4500000,
//   },
//   {
//     name: "Phí tổn",
//     number: 120000,
//   },
// ];

const RevenuePage = () => {
  const [profit, setProfit] = useState(3984000);
  const [keyWord, setKeyWord] = useState("");
  const [capitalLoss, setCapitalLoss] = useState(0);
  const TimeReal = new Date();
  const listOption = [
    {
      label: "Tuần",
      value: "weekly",
    },
    {
      label: "Tháng",
      value: "monthly",
    },
    {
      label: "Năm",
      value: "yearly",
    },
  ];
  const [weekHidden, setWeekHidden] = useState(false);
  const [monthHidden, setMonthHidden] = useState(true);
  const [yearHidden, setYearHidden] = useState(true);

  return (
    <div className="bg-white">
      {/* Option */}
      <Space className="flex justify-between border-b py-3">
        <div className="inline-block content-around font-bold text-xl ml-5">
          Bảng doanh thu
        </div>
        <Space className="flex gap-20 mr-2">
          <Search
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            onChange={(value) => {
              setKeyWord(value);
            }}
          />
          <Segmented
            size="large"
            options={listOption}
            onChange={(value) => {
              if (value === "weekly") {
                setWeekHidden(false);
                setMonthHidden(true);
                setYearHidden(true);
              } else {
                if (value === "monthly") {
                  setWeekHidden(true);
                  setMonthHidden(false);
                  setYearHidden(true);
                } else {
                  setWeekHidden(true);
                  setMonthHidden(true);
                  setYearHidden(false);
                }
              }
            }}
          />
          <div hidden={weekHidden}>
            <DatePicker
              placeholder="Chọn tuần"
              picker="week"
              disabledDate={(currentDate) => {
                return currentDate && currentDate.valueOf() > Date.now();
              }}
              defaultValue={moment(TimeReal)}
              onChange={(date) => {
                console.log(date._d.getDay());
              }}
            />
          </div>
          <div hidden={monthHidden}>
            <DatePicker
              placeholder="Chọn tháng"
              picker="month"
              disabledDate={(currentDate) => {
                return currentDate && currentDate.valueOf() > Date.now();
              }}
              format={"MM-YYYY"}
              defaultValue={moment(TimeReal)}
            />
          </div>
          <div hidden={yearHidden}>
            <DatePicker
              placeholder="Chọn năm"
              picker="year"
              disabledDate={(currentDate) => {
                return currentDate && currentDate.valueOf() > Date.now();
              }}
              format={"YYYY"}
              defaultValue={moment(TimeReal)}
            />
          </div>
        </Space>
      </Space>

      {/* Cập nhật thời gian thực */}
      <div className="flex flex-row justify-end items-center px-5 py-2 text-gray-500 opacity-80 italic cursor-default">
        {"Dữ liệu đươc cập nhật lần cuối lúc: " +
          moment(new Date()).format("DD/MM/YYYY  HH:MM")}
      </div>

      <TableRevenue keyWord={keyWord} data={""} loading={""} />

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
