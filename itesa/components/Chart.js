import React, { Component } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
export default class Graficos extends Component {
  constructor(props) {
    super(props);
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
          categories: props.campaign,
        },
        title: {
          text: props.text,
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
      },
      series: [
        {
          data: props.quantity,
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

            height={"100%"}
            width={"100%"}

          />
        )}
      </div>
    );
  }
}
