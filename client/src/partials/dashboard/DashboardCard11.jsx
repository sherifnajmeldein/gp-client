import React from 'react';
import BarChart from '../../charts/BarChart03';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard11({ chartData }) {
  // Add additional attributes to each dataset
  const modifiedData = chartData.datasets.map((dataset) => ({
    ...dataset,
    backgroundColor: "#" + ((Math.random() * 0xffffff) << 0).toString(16), // Random color generation (you can replace this with your own colors)
    hoverBackgroundColor: "#" + ((Math.random() * 0xffffff) << 0).toString(16), // Random color generation for hover (you can replace this with your own colors)
    barPercentage: 1, // Adjust as needed
    categoryPercentage: 1, // Adjust as needed
  }));

  const modifiedChartData = {
    ...chartData,
    datasets: modifiedData,
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          reasons of wrong answers
        </h2>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            449
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={modifiedChartData} width={595} height={48} />
      </div>
    </div>
  );
}

export default DashboardCard11;
