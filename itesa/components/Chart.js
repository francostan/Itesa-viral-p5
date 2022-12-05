import React, { Component } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default class Graficos extends Component {
  constructor(props) {
    super(props);
    console.log("&&&&&&&&&&&", props);
    this.state = {
      options: {
        chart: {
          group: "sparks",
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: props.datos, //
        },
      },
      series: [
        {
          data: props.datos,
        },
      ],
    };
  }
  render() {
    return (
      <div>
        {typeof window !== "undefined" && (
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
            width={600}
          />
        )}
      </div>
    );
  }
}
