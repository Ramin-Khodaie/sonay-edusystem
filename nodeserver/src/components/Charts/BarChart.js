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

    console.log(this.props.options,3131)
    console.log(this.props.data,3131)
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
