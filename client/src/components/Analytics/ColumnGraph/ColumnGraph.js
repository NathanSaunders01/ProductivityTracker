import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import gradstop from "gradstop";

const columnGraph = ({ title, categories, series, type, dataType }) => {
  const gradient = gradstop({
    stops: categories.length > 0 ? categories.length : 5,
    inputFormat: "hex",
    colorArray: ["#5dbcd3", "#11174b"]
  });
  const options = {
    chart: {
      type: type
    },
    colors: gradient,
    title: {
      text: `${dataType} ${title}`
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
