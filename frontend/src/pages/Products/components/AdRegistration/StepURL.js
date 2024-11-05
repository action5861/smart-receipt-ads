import React, { useState } from 'react';
import { LinkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const StepURL = ({ url, productInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const fetchProductInfo = async (url) => {
    setLoading(true);
    setError('');

    try {
      // TODO: API 연동 후 실제 데이터 fetch 로직 구현
      const mockData = {
        title: '샘플 상품명',
        price: '29,000원',
        thumbnail: '/api/placeholder/300/300',
        seller: '샘플 스토어',
      };

      return mockData;
    } catch (err) {
      setError('상품 정보를 불러오는데 실패했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleURLChange = async (e) => {
    const newURL = e.target.value;
    onUpdate(newURL, null);
    setError('');

    if (!newURL) return;

    if (!validateURL(newURL)) {
      setError('올바른 URL을 입력해주세요.');
      return;
    }

    const info = await fetchProductInfo(newURL);
    if (info) {
      onUpdate(newURL, info);
    }
  };

  const handleRefresh = async () => {
    if (!url || !validateURL(url)) return;
    const info = await fetchProductInfo(url);
    if (info) {
      onUpdate(url, info);
    }
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상품 URL
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LinkIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={url}
            onChange={handleURLChange}
            className={`block w-full pl-10 pr-12 py-2 sm:text-sm rounded-md ${
              error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            }`}
            placeholder="https://..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              onClick={handleRefresh}
              disabled={!url || loading}
              className={`p-1 rounded-full hover:bg-gray-100 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ArrowPathIcon className={`h-5 w-5 text-gray-400 ${
                loading ? 'animate-spin' : ''
              }`} />
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          판매 중인 상품의 URL을 입력해주세요.
        </p>
      </div>

      {/* Preview */}
      {productInfo && (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={productInfo.thumbnail}
                  alt={productInfo.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {productInfo.title}
                </p>
                <p className="text-sm text-gray-500">
                  {productInfo.seller}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {productInfo.price}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              * 상품 정보는 실시간으로 동기화됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepURL;