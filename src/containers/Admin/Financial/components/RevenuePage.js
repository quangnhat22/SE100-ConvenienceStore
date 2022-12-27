import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import moment from "moment";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import TableRevenue from "./TableRevenue";
import { Segmented } from "antd";
import { useDispatch, useSelector } from "react-redux";

const RevenuePage = () => {
  const TimeReal = new Date();
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState({
    year: TimeReal.getFullYear(),
  });
  const [selectedMonth, setSelectedMonth] = useState({
    year: TimeReal.getFullYear(),
    month: TimeReal.getMonth(),
  });
  const [selectedWeek, setSelectedWeek] = useState({
    year: TimeReal.getFullYear(),
    month: TimeReal.getMonth(),
    day: TimeReal.getDate(),
  });
  const { loading, reports } = useSelector((state) => state.reportsSlice);
  const [time, setTime] = useState({
    year: TimeReal.getFullYear(),
    month: TimeReal.getMonth(),
    day: TimeReal.getDate(),
  });
  const [valueFilter, setValueFilter] = useState("WEEK");
  useEffect(() => {
    dispatch({
      type:
        valueFilter === "WEEK"
          ? SagaActionTypes.GET_REPORT_WEEK_SAGA
          : valueFilter === "MONTH"
          ? SagaActionTypes.GET_REPORT_MONTH_SAGA
          : SagaActionTypes.GET_REPORT_YEAR_SAGA,
      year: time.year,
      month: time.month,
      day: time.day,
    });
  }, [time]);
  const [keyWord, setKeyWord] = useState("");
  const [profit, setProfit] = useState(3984000);
  const [capitalLoss, setCapitalLoss] = useState(0);
  const listOption = [
    {
      label: "Tuần",
      value: "WEEK",
    },
    {
      label: "Tháng",
      value: "MONTH",
    },
    {
      label: "Năm",
      value: "YEAR",
    },
  ];
  const [weekHidden, setWeekHidden] = useState(false);
  const [monthHidden, setMonthHidden] = useState(true);
  const [yearHidden, setYearHidden] = useState(true);

  return (
    <div className="bg-white">
      {/* Option */}
      <Space className="flex flex-wrap justify-between border-b py-3 gap-x-4 gap-y-2">
        <div className="inline-block content-around font-semibold text-2xl whitespace-nowrap ml-5">
          Bảng doanh thu
        </div>
        <Space className="flex gap-20 mr-2">
          <Search
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
          <Segmented
            size="large"
            options={listOption}
            onChange={(value) => {
              setValueFilter(value);
              if (value === "WEEK") {
                setWeekHidden(false);
                setMonthHidden(true);
                setYearHidden(true);
                setTime(selectedWeek);
              } else {
                if (value === "MONTH") {
                  setWeekHidden(true);
                  setMonthHidden(false);
                  setYearHidden(true);
                  setTime(selectedMonth);
                } else {
                  if (value === "YEAR") {
                    setWeekHidden(true);
                    setMonthHidden(true);
                    setYearHidden(false);
                    setTime(selectedYear);
                  }
                }
              }
            }}
          />
          <div hidden={weekHidden}>
            <DatePicker
              allowClear={false}
              placeholder="Chọn tuần"
              picker="week"
              disabledDate={(currentDate) => {
                return currentDate && currentDate.valueOf() > Date.now();
              }}
              defaultValue={moment(TimeReal)}
              onChange={(date) => {
                setSelectedWeek({
                  year: moment(date).getFullYear(),
                  month: moment(date).getMonth(),
                  day: moment(date).getDate(),
                });
                setTime({
                  year: moment(date).getFullYear(),
                  month: moment(date).getMonth(),
                  day: moment(date).getDate(),
                });
              }}
            />
          </div>
          <div hidden={monthHidden}>
            <DatePicker
              allowClear={false}
              placeholder="Chọn tháng"
              picker="month"
              disabledDate={(currentDate) => {
                return currentDate && currentDate.valueOf() > Date.now();
              }}
              format={"MM-YYYY"}
              defaultValue={moment(TimeReal)}
              onChange={(date) => {
                setSelectedMonth({
                  year: moment(date).getFullYear(),
                  month: moment(date).getMonth(),
                });
                setTime({
                  year: moment(date).getFullYear(),
                  month: moment(date).getMonth(),
                });
              }}
            />
          </div>
          <div hidden={yearHidden}>
            <DatePicker
              allowClear={false}
              placeholder="Chọn năm"
              picker="year"
              disabledDate={(currentDate) => {
                return currentDate && currentDate.valueOf() > Date.now();
              }}
              format={"YYYY"}
              defaultValue={moment(TimeReal)}
              onChange={(date) => {
                setSelectedYear({
                  year: moment(date).getFullYear(),
                });
                setTime({
                  year: moment(date).getFullYear(),
                });
              }}
            />
          </div>
        </Space>
      </Space>

      {/* Cập nhật thời gian thực */}
      <div className="flex flex-row justify-end items-center px-5 py-2 text-gray-500 opacity-80 italic cursor-default">
        {"Dữ liệu đươc cập nhật lần cuối lúc: " +
          moment(new Date()).format("DD/MM/YYYY  HH:MM")}
      </div>

      <TableRevenue keyWord={keyWord} data={reports} loading={loading} />

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
