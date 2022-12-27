import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const BestSellingTable = () => {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.reportsSlice);
  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_REPORT_WEEK_SAGA,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
    });
  }, []);

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
      dataIndex: ["product", "title"],
      key: "title",
    },
    {
      dataIndex: "quanlity",
      key: "quanlity",
      sorter: (a, b) => a.quanlity - b.quanlity,
      defaultSortOrder: "descend",
    },
  ];
  return (
    <Table
      className="customTable mt-2"
      rowKey={"id"}
      size="small"
      showHeader={false}
      pagination={false}
      columns={columnsTopSale}
      dataSource={reports.slice(0, 10)}
    />
  );
};

export default BestSellingTable;
