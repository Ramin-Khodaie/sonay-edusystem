import { Center, useColorMode } from "@chakra-ui/react";
import Card from "components/Card/Card";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "variables/charts";

const PolarBasicChart = (props) => {
  const colorMode = useColorMode().colorMode;
  const { selectedMark } = props;
  const [series, setSeries] = useState([]);
  let textColor = ["#fff"];
  if (colorMode === "light") {
    textColor = ["#000"];
  }
  const values = {
    outstanding: 100,
    good: 75,
    satisfactory: 50,
    weak: 25,
  };
  const keys = [
    "homework",
    "writing",
    "reading",
    "speaking",
    "listening",
    "activity",
  ];

  const options = {
    labels: [
      "تکالیف",
      "مهارت نوشتن",
      "مهارت خواندن",
      "مهارت مکالمه",
      "مهارت شنیدن",
      "فعالیت در کلاس",
    ],
    dataLables : {style : {fontSize : "30px"}},
    tooltip:{style : {fontSize : "30px"}},
    chart: {
      type: "polarArea",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.9,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const prepareSeries = () => {
    let tmp = [];
    keys.map((k, id) => {
      // setSeries([...series , values[selectedMark[k].id]])
      tmp.push(values[selectedMark[k].id]);
    });
    setSeries(tmp);
  };

  useEffect(() => {
    prepareSeries();
  }, [selectedMark]);

  return (
    <Card height={"100%"}>
      {series.length === 6 && (
        <ReactApexChart options={options} series={series} type="polarArea" />
      )}
    </Card>
  );
};

export default PolarBasicChart;
