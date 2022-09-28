import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };


    console.log(this.props.data,322)
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.data,
      chartOptions: this.props.options,
    });
  }

  render() {
    return (
        <Chart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="bar"          
          width="100%"
          height="100%"
        />
    );
  }
}

export default BarChart;
