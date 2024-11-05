import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { date: '08/01', views: 4000, clicks: 2400, conversions: 400 },
  { date: '08/02', views: 3000, clicks: 1398, conversions: 210 },
  { date: '08/03', views: 2000, clicks: 9800, conversions: 290 },
  { date: '08/04', views: 2780, clicks: 3908, conversions: 300 },
  { date: '08/05', views: 1890, clicks: 4800, conversions: 181 },
  { date: '08/06', views: 2390, clicks: 3800, conversions: 250 },
  { date: '08/07', views: 3490, clicks: 4300, conversions: 210 }
];

const PerformanceChart = () => {
  const [period, setPeriod] = useState('week'); // week, month, year

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">광고 성과 추이</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setPeriod('week')}
            className={`px-3 py-1 rounded-md text-sm ${
              period === 'week'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            주간
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1 rounded-md text-sm ${
              period === 'month'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            월간
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-3 py-1 rounded-md text-sm ${
              period === 'year'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            연간
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" name="노출수" />
            <Line type="monotone" dataKey="clicks" stroke="#82ca9d" name="클릭수" />
            <Line type="monotone" dataKey="conversions" stroke="#ffc658" name="전환수" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;