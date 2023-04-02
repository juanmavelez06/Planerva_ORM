import React from "react";
import "./index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

//Config ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

function BudgetLineChart({ title, data}) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label,
        data: data.data,
        borderColor: "rgb(0, 99, 65)",
        backgroundColor: "rgba(0, 198, 125, .8)",
      },
    ],
  };

  return (
    <div className="line-chart-ctn">
      <h2>{title}</h2>
      <Line options={options} data={chartData}></Line>
    </div>
  );
}

export default BudgetLineChart;
