import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement // Registering PointElement
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import and register the date adapter
import { format } from 'date-fns'; // Import the format function from date-fns

// Register Chart.js components
ChartJS.register(
  TimeScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement // Register PointElement
);

const RevenueChart = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd', // Use a valid format string for date-fns
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Revenue ($)',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            const date = format(new Date(context.label), 'yyyy-MM-dd'); // Custom date formatting

            return `${label}: $${value.toFixed(2)} on ${date}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
