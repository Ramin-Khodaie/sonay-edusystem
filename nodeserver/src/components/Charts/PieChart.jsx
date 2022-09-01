import { useEffect, useState } from "react";
import { PieChartOprtions, PieChartData } from "variables/charts";
import Chart from "react-apexcharts";

const PieChart = () => {
  console.log(9911, PieChartData.series);
  const [state, setState] = useState({ chartData: [], chartOptions: {} });

  useEffect(() => {
    setState({
      chartData:PieChartData.series.data,
      chartOptions: PieChartOprtions,
    });
  }, []);
  return <Chart
            options={state.chartOptions}
            series={state.chartData}
            type="donut"
            width="100%"
            height="100%"
    />;
};

export default PieChart;
