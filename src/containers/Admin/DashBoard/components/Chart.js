import React from "react";
import { Column } from "@ant-design/charts";

const data = [
  {
    name: "1",
    number: 54,
  },
  {
    name: "2",
    number: 65,
  },
  {
    name: "3",
    number: 204,
  },
  {
    name: "4",
    number: 10,
  },
  {
    name: "5",
    number: 39,
  },
  {
    name: "6",
    number: 30,
  },
  {
    name: "7",
    number: 10,
  },
  {
    name: "8",
    number: 12,
  },
  {
    name: "9",
    number: 45,
  },
];

const Chart = () => {
  const config = {
    data,
    xField: "name",
    yField: "number",
    columnStyle: {
      fill: "#1890FF",
      stroke: "gray",
      strokeOpacity: 0.5,
      lineWidth: 1,
      lineDash: [0, 0],
      shadowColor: "gray",
      shadowBlur: 5,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      cursor: "pointer",
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
      tickLine: false,
      text: "Sản phẩm",
    },
    yAxis: {
      text: "Sô lượng bán ra",
    },
    animation: {
      appear: {
        animation: "scale-in-y",
        duration: 600,
      },
    },
    meta: {
      name: { alias: "Sản phẩm" },
      number: { alias: "Sô lượng bán ra" },
    },
  };

  return <Column {...config} />;
};

export default Chart;