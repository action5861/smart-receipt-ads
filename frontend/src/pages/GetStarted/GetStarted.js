import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ChartBarIcon, CurrencyDollarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const GetStarted = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "스마트한 상품 매칭",
      description: "AI가 고객의 구매 패턴을 분석하여 최적의 상품을 자동으로 매칭해드립니다.",
      icon: ShoppingCartIcon,
    },
    {
      title: "실시간 성과 분석",
      description: "광고 성과를 실시간으로 확인하고 효율적인 마케팅 전략을 수립하세요.",
      icon: ChartBarIcon,
    },
    {
      title: "비용 효율적인 광고",
      description: "실제 구매 가능성이 높은 고객에게만 광고가 노출되어 광고 효율이 극대화됩니다.",
      icon: CurrencyDollarIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-600">
                Smart Receipt Ads
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900"
              >
                로그인
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">구매 데이터 기반</span>
                  <span className="block text-primary-600">스마트 광고 플랫폼</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  영수증 하나로 시작하는 맞춤형 마케팅
                  <br />
                  실제 구매 가능성이 높은 고객에게 직접 도달하세요
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('/register')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      시작하기
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              왜 Smart Receipt Ads인가요?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              구매 데이터 기반의 정확한 타겟팅으로 마케팅 효율을 극대화합니다
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.title}
                  </p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              이용 방법
            </h2>
          </div>
          <div className="mt-10">
            <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <span className="text-4xl font-bold text-primary-600">1</span>
                  <h3 className="mt-4 text-lg font-medium">상품 등록</h3>
                  <p className="mt-2 text-gray-500">판매하고자 하는 상품을 등록하세요</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <span className="text-4xl font-bold text-primary-600">2</span>
                  <h3 className="mt-4 text-lg font-medium">자동 매칭</h3>
                  <p className="mt-2 text-gray-500">AI가 적합한 고객과 매칭해드립니다</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <span className="text-4xl font-bold text-primary-600">3</span>
                  <h3 className="mt-4 text-lg font-medium">성과 확인</h3>
                  <p className="mt-2 text-gray-500">실시간으로 광고 성과를 확인하세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">준비되셨나요?</span>
            <span className="block text-primary-100">지금 바로 시작하세요.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                시작하기
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Smart Receipt Ads. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;