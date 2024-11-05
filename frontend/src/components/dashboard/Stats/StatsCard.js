import React from 'react';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ChartPieIcon, 
  ReceiptRefundIcon 
} from '@heroicons/react/24/outline';

const StatsCards = () => {
  const stats = [
    {
      name: '실시간 광고',
      value: '23개',
      change: '+2.5%',
      changeType: 'increase',
      icon: ChartBarIcon,
      details: '현재 활성 광고'
    },
    {
      name: '예산 현황',
      value: '890,000원',
      change: '잔여 예산',
      changeType: 'neutral',
      icon: CurrencyDollarIcon,
      details: '일일 소진액: 120,000원'
    },
    {
      name: '전환율',
      value: '3.2%',
      change: '+0.8%',
      changeType: 'increase',
      icon: ChartPieIcon,
      details: '클릭률: 5.7%'
    },
    {
      name: '이번 달 정산',
      value: '2,450,000원',
      change: '미정산: 150,000원',
      changeType: 'neutral',
      icon: ReceiptRefundIcon,
      details: '전월 대비 +12.3%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
        key={stat.name}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 px-5 py-6"
      >
          <div className="flex-shrink-0">
            <stat.icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
                stat.changeType === 'increase' 
                  ? 'bg-green-100 text-green-800'
                  : stat.changeType === 'decrease'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;