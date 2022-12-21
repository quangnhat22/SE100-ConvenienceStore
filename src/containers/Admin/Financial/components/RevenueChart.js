import React from "react";
import { Column } from "@ant-design/plots";

const RevenueChart = (props) => {
  const config = {
    data: props.data,
    isGroup: true,
    xField: "time",
    yField: "number",
    seriesField: "name",
    dodgePadding: 2,
    intervalPadding: 20,
    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };

  return <Column {...config} />;
};

export default RevenueChart;
