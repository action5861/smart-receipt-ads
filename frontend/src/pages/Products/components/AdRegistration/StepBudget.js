import React, { useState, useEffect } from 'react';
import { CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const StepBudget = ({ budget, onUpdate }) => {
  const [estimations, setEstimations] = useState({
    dailyReach: 0,
    totalReach: 0,
    expectedDuration: 0,
    costPerMessage: 50 // 메시지 1건당 비용 (원)
  });

  // 예산 변경 시 예측치 계산
  useEffect(() => {
    const calculateEstimations = () => {
      const dailyReach = Math.floor(budget.daily / estimations.costPerMessage);
      const totalReach = Math.floor(budget.total / estimations.costPerMessage);
      const expectedDuration = Math.ceil(budget.total / budget.daily);
  
      setEstimations(prev => ({
        ...prev,
        dailyReach,
        totalReach,
        expectedDuration
      }));
    };
  
    calculateEstimations();
  }, [budget, estimations.costPerMessage]); // 의존성 배열 수정

  const handleBudgetChange = (type, value) => {
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    
    if (type === 'daily' && numValue > budget.total) {
      return; // 일일 예산이 총 예산을 초과할 수 없음
    }

    onUpdate({
      ...budget,
      [type]: numValue
    });
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  return (
    <div className="space-y-6">
      {/* Daily Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          일일 예산
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={formatNumber(budget.daily)}
            onChange={(e) => handleBudgetChange('daily', e.target.value)}
            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">원</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          하루에 사용할 최대 광고 예산을 설정하세요.
        </p>
      </div>

      {/* Total Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          총 예산
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={formatNumber(budget.total)}
            onChange={(e) => handleBudgetChange('total', e.target.value)}
            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">원</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          총 사용할 광고 예산을 설정하세요.
        </p>
      </div>

      {/* Estimations */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
          예상 광고 효과
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">일일 예상 도달</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatNumber(estimations.dailyReach)}명
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">총 예상 도달</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatNumber(estimations.totalReach)}명
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">예상 진행 기간</p>
            <p className="text-lg font-semibold text-gray-900">
              {estimations.expectedDuration}일
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">메시지 단가</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatNumber(estimations.costPerMessage)}원
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          * 예상 수치는 실제 광고 집행 결과와 다를 수 있습니다.
        </p>
      </div>

      {/* Budget Guidelines */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">
          예산 설정 가이드
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 최소 일일 예산: 10,000원</li>
          <li>• 최소 총 예산: 100,000원</li>
          <li>• 일일 예산은 총 예산을 초과할 수 없습니다.</li>
          <li>• 예산 소진 시 자동으로 광고가 중단됩니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default StepBudget;