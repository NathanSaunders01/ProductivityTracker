import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const columnGraph = ({ title, categories, series, type }) => {
  const options = {
    chart: {
      type: type
    },
    colors: [
      "#2f7ed8",
      "#0d233a",
      "#8bbc21",
      "#910000",
      "#1aadce",
      "#492970",
      "#f28f43",
      "#77a1e5",
      "#c42525",
      "#a6c96a"
    ],
    title: {
      text: title
    },
    xAxis: {
      categories: categories
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total xp"
      },
      stackLabels: {
        enabled: true,
        style: {
          color: (Highcharts.theme && Highcharts.theme.textColor) || "gray"
        }
      }
    },
    legend: {
      align: "right",
      x: -30,
      verticalAlign: "center",
      y: 25,
      floating: false,
      backgroundColor:
        (Highcharts.theme && Highcharts.theme.background2) || "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          color:
            (Highcharts.theme && Highcharts.theme.dataLabelsColor) || "white"
        }
      }
    },
    series: series
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        updateArgs={[true, true, true]}
        options={options}
        allowChartUpdate={"update"}
      />
    </div>
  );
};

export default columnGraph;
