import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const PaymentHistory = () => {
  const transactions = [
    {
      id: 1,
      type: 'charge',
      amount: 500000,
      date: '2024-02-01',
      status: 'completed',
      description: '광고 예산 충전'
    },
    {
      id: 2,
      type: 'spend',
      amount: 150000,
      date: '2024-02-01',
      status: 'completed',
      description: '1월 광고비 정산'
    },
    {
      id: 3,
      type: 'refund',
      amount: 50000,
      date: '2024-01-31',
      status: 'completed',
      description: '미소진 예산 환불'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">결제/정산 내역</h3>
          <button className="flex items-center text-sm text-primary-600 hover:text-primary-700">
            <DocumentTextIcon className="h-5 w-5 mr-1" />
            세금계산서 조회
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'charge' ? 'bg-green-100' :
                  transaction.type === 'spend' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {transaction.type === 'charge' ? (
                    <ArrowUpIcon className="h-5 w-5 text-green-600" />
                  ) : transaction.type === 'spend' ? (
                    <ArrowDownIcon className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <ArrowUpIcon className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  transaction.type === 'charge' ? 'text-green-600' :
                  transaction.type === 'spend' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {transaction.type === 'spend' ? '-' : '+'}
                  {transaction.amount.toLocaleString()}원
                </p>
                <p className="text-xs text-gray-500">{transaction.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-700">
          전체 내역 보기
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;