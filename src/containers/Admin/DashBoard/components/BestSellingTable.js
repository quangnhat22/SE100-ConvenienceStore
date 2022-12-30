import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const BestSellingTable = (props) => {
  const dispatch = useDispatch();
  const { reportsWeek } = useSelector((state) => state.reportsSlice);
  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_REPORT_WEEK_SAGA,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
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
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      defaultSortOrder: "descend",
    },
  ];
  return (
    <Table
      className={props.className}
      rowKey={"id"}
      size="small"
      showHeader={false}
      pagination={false}
      columns={columnsTopSale}
      dataSource={reportsWeek.slice(0, 10)}
    />
  );
};

export default BestSellingTable;
