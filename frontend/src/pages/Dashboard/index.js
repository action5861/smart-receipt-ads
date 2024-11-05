import React, { useState, useEffect } from 'react';
import Layout from '../../components/common/Layout';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ChartPieIcon, 
  ReceiptRefundIcon,
  BellIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import api from '../../utils/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 대시보드 데이터 fetch
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/stats/dashboard');
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchDashboardData();
    // 5초마다 데이터 자동 갱신
    const intervalId = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading && !dashboardData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-600">
            {error}
            <button 
              onClick={fetchDashboardData}
              className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-md"
            >
              다시 시도
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="mt-1 text-sm text-gray-500">
            광고 성과와 주요 지표를 확인하세요
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* 실시간 광고 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <ChartBarIcon className="h-6 w-6 text-gray-400" />
                  <p className="ml-2 text-sm font-medium text-gray-500">실시간 광고</p>
                </div>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {dashboardData?.realTimeStats.activeAds}개
                </p>
                <p className="mt-1 text-sm text-gray-500">현재 활성 광고</p>
              </div>
            </div>
          </div>

          {/* 예산 현황 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-gray-400" />
                  <p className="ml-2 text-sm font-medium text-gray-500">예산 현황</p>
                </div>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {formatNumber(dashboardData?.budgetStatus.total.remaining)}원
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  잔여 예산
                </p>
              </div>
            </div>
          </div>

          {/* 전환율 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <ChartPieIcon className="h-6 w-6 text-gray-400" />
                  <p className="ml-2 text-sm font-medium text-gray-500">전환율</p>
                </div>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {dashboardData?.performance.cvr}%
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  클릭률: {dashboardData?.performance.ctr}%
                </p>
              </div>
            </div>
          </div>

          {/* 이번 달 정산 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <ReceiptRefundIcon className="h-6 w-6 text-gray-400" />
                  <p className="ml-2 text-sm font-medium text-gray-500">이번 달 정산</p>
                </div>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {formatNumber(dashboardData?.realTimeStats.monthlySettlement)}원
                </p>
                <p className="mt-1 text-sm text-gray-500">전월 대비 +12.3%</p>
              </div>
            </div>
          </div>
        </div>

        {/* 성과 지표 & 알림 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 성과 지표 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">성과 추이</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>노출수: {formatNumber(dashboardData?.performance.views)}회</span>
                <span>클릭수: {formatNumber(dashboardData?.performance.clicks)}회</span>
                <span>전환수: {formatNumber(dashboardData?.performance.conversions)}회</span>
              </div>
              {/* 차트는 추후 추가 */}
            </div>
          </div>

          {/* 알림 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">실시간 알림</h2>
                <BellIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">새로운 알림이 없습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;