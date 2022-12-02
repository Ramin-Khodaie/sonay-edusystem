import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    }


  }

  


  
  componentDidMount() {
    this.setState({
      chartData: this.props.data,
      chartOptions: this.props.options,
    });
  }


  render() {
    return (
      


<div id="chart">
<ReactApexChart options={this.state.chartOptions} series={this.state.chartData} type="bar" height={350} />
</div>



    );
  }
}

export default BarChart;
