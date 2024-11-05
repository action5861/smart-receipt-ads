import React from 'react';
import { PlayIcon, PauseIcon, TrashIcon } from '@heroicons/react/24/outline';

const ActiveAdsList = () => {
  const activeAds = [
    {
      id: 1,
      name: '스킨케어 제품',
      status: 'active',
      budget: {
        total: 500000,
        spent: 450000
      },
      performance: {
        impressions: 12500,
        clicks: 350,
        ctr: 2.8
      }
    },
    {
      id: 2,
      name: '향수 신제품',
      status: 'paused',
      budget: {
        total: 300000,
        spent: 150000
      },
      performance: {
        impressions: 8200,
        clicks: 180,
        ctr: 2.2
      }
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">활성 광고 목록</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activeAds.map((ad) => (
          <div key={ad.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-900">{ad.name}</h4>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {ad.status === 'active' ? '진행중' : '일시중지'}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <div className="mr-4">
                    <span className="font-medium">예산:</span>{' '}
                    {`${ad.budget.spent.toLocaleString()}/${ad.budget.total.toLocaleString()}원`}
                  </div>
                  <div>
                    <span className="font-medium">CTR:</span>{' '}
                    {`${ad.performance.ctr}%`}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  {ad.status === 'active' ? (
                    <PauseIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <PlayIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <TrashIcon className="h-5 w-5 text-red-400" />
                </button>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full"
                style={{ width: `${(ad.budget.spent / ad.budget.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAdsList;