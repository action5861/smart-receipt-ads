import React from 'react';
import { BellIcon, XCircleIcon } from '@heroicons/react/24/outline';

const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      type: 'budget',
      message: '스킨케어 광고의 예산이 90% 소진되었습니다.',
      time: '10분 전',
      importance: 'high'
    },
    {
      id: 2,
      type: 'performance',
      message: '향수 광고의 클릭률이 20% 증가했습니다.',
      time: '1시간 전',
      importance: 'medium'
    },
    {
      id: 3,
      type: 'system',
      message: '정산 내역이 업데이트 되었습니다.',
      time: '3시간 전',
      importance: 'low'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">실시간 알림</h3>
          <BellIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-50 ${
              notification.importance === 'high' ? 'bg-red-50' :
              notification.importance === 'medium' ? 'bg-yellow-50' : 'bg-white'
            }`}
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-700">
          모든 알림 보기
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;