import { DatePicker, Space } from "antd";
import moment from "moment";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import TableRevenue from "./TableRevenue";
import { Segmented } from "antd";
import { useDispatch, useSelector } from "react-redux";

const RevenuePage = () => {
  const TimeReal = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState({
    year: TimeReal.year,
  });
  const [selectedMonth, setSelectedMonth] = useState({
    year: TimeReal.year,
    month: TimeReal.month,
  });
  const [selectedWeek, setSelectedWeek] = useState({
    year: TimeReal.year,
    month: TimeReal.month,
    day: TimeReal.day,
  });
  const { loading, reports } = useSelector((state) => state.reportsSlice);
  const [time, setTime] = useState({
    year: TimeReal.year,
    month: TimeReal.month,
    day: TimeReal.day,
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
    <div>
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
              defaultValue={moment()}
              onChange={(date) => {
                setSelectedWeek({
                  year: moment(date).year(),
                  month: moment(date).month() + 1,
                  day: moment(date).date(),
                });
                setTime({
                  year: moment(date).year(),
                  month: moment(date).month() + 1,
                  day: moment(date).date(),
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
              defaultValue={moment()}
              onChange={(date) => {
                setSelectedMonth({
                  year: moment(date).year(),
                  month: moment(date).month() + 1,
                });
                setTime({
                  year: moment(date).year(),
                  month: moment(date).month() + 1,
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
              defaultValue={moment()}
              onChange={(date) => {
                setSelectedYear({
                  year: moment(date).year(),
                });
                setTime({
                  year: moment(date).year(),
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
    </div>
  );
};

export default RevenuePage;
