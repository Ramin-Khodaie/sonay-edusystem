import Card from "components/Card/Card";
import React from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getCompareChartData } from "services/mark";




const MultiBarchart = (props) => {
  const {courseId , userName} = props
  
  console.log(courseId , userName , 5151)

    const options = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      }

      const series = [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }]


    
    return (
        <Card height={'100%'}>
            {series.length === 2 && <ReactApexChart options={options} series={series} type="bar" height={350} />}
        </Card>

    )
}

export default MultiBarchart;
