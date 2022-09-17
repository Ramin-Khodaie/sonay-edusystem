import { Center } from "@chakra-ui/react";
import Card from "components/Card/Card";
import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "variables/charts";


const PolarBasicChart = (props)=>{


    const series = [14, 23, 21, 17, 15, 10, 12, 17, 21]

const options = {
    chart: {
      type: 'polarArea',
    },
    stroke: {
      colors: ['#fff']
    },
    fill: {
      opacity: 0.8
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 100
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
    return(
        <Card height={'100%'} >

<ReactApexChart options={options} series={series} type="polarArea" />

        </Card>

    )
}

export default PolarBasicChart;
