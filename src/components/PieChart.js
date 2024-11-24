// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register required Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export function PieChart({ scores }) {
  // Pie chart data
  const data = {
    labels: Object.keys(scores), // Classes i.e. 'Admitted', 'Waitlisted', 'Rejected'
    datasets: [
      {
        data: Object.values(scores), // Scores for each class
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"], // Corresponding colors for each class
        borderColor: ["#ffffff", "#ffffff", "#ffffff"], // Border color for segments
        borderWidth: 2,
      },
    ],
  };

  // Pie chart options (with cutout for donut chart)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 5,
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            // Showing percentage in tooltip
            const value = tooltipItem.raw;
            const percentage = ((value / Object.values(scores).reduce((acc, val) => acc + val, 0)) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
    cutout: "60%", // This controls the radius of the hole in the middle
  };

  return (
    <div style={{ width: "300px", height: "300px", margin: "20px auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
}
