import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseCharts = ({ incomes, expenses }) => {
  // Prepare data for the line chart (daily basis)
  const incomeDataByDay = incomes.reduce((acc, income) => {
    const day = new Date(income.date).toLocaleDateString('en-US');
    acc[day] = (acc[day] || 0) + income.amount;
    return acc;
  }, {});

  const expenseDataByDay = expenses.reduce((acc, expense) => {
    const day = new Date(expense.date).toLocaleDateString('en-US');
    acc[day] = (acc[day] || 0) + expense.amount;
    return acc;
  }, {});

  const labels = Array.from(new Set([...Object.keys(incomeDataByDay), ...Object.keys(expenseDataByDay)]));
  labels.sort((a, b) => new Date(a) - new Date(b));

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map((day) => incomeDataByDay[day] || 0),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: labels.map((day) => expenseDataByDay[day] || 0),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare data for the pie chart
  const expenseCategories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expenseCategories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Income vs. Expenses',
      },
    },
  };

  return (
    <div className="dark:bg-gray-900 h-[80vh] p-4 text-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-center">Income and Expenses Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <Line data={lineChartData} options={options} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <Pie data={pieChartData} options={{ ...options, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseCharts;
