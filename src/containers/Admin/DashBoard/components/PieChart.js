import React, { useEffect, useState } from "react";
import { Pie, G2 } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../../../../redux/constants/constant";

const PieChart = (props) => {
  const dispatch = useDispatch();
  const [revenue, setRevenue] = useState(0);
  const [cost, setCost] = useState(0);
  const [profit, setProfit] = useState(0);
  const { reports } = useSelector((state) => state.reportsSlice);
  useEffect(() => {
    dispatch({
      type: SagaActionTypes.GET_REPORT_MONTH_SAGA,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });
  }, []);
  useEffect(() => {
    var totalRevenue = 0;
    var totalProfit = 0;
    reports.forEach((element) => {
      totalRevenue += element.revenue;
      totalProfit += element.profit;
    });
    setRevenue(totalRevenue);
    setProfit(totalProfit);
    setCost(totalRevenue - totalProfit);
  }, [reports]);
  const dataRevenue = [
    {
      name: "Doanh thu",
      number: revenue,
    },
    {
      name: "Chi phí",
      number: cost,
    },
    {
      name: "Lợi nhuận",
      number: profit,
    },
  ];
  const G = G2.getEngine("canvas");
  const config = {
    data: dataRevenue,
    appendPadding: 10,
    angleField: "number",
    colorField: "name",
    radius: 0.75,
    legend: false,
    label: {
      type: "spider",
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: "circle",
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 10,
            y: 8,
            text: `${data.name}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 0,
            y: 25,
            text:
              data.number
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
              " VNĐ" +
              ` → ${(Math.round(data.percent * 100) / 100) * 100}%`,
            fill: "rgba(0, 0, 0, 0.65)",
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return <Pie className={props.className} {...config} />;
};

export default PieChart;
