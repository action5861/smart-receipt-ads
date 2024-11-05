import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import AdRegistration from './components/AdRegistration';
import { PlusIcon } from '@heroicons/react/24/outline';

const Products = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [ads, setAds] = useState([]); 
  const [editingAd, setEditingAd] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      console.log('Submitted form data:', formData);
      
      if (editingAd) {
        // 수정 로직
        setAds(prev => prev.map(ad => 
          ad._id === editingAd._id 
            ? { ...ad, ...formData }
            : ad
        ));
      } else {
        // 새로운 광고 추가 로직
        setAds(prev => [...prev, {
          _id: Date.now().toString(),
          ...formData,
          status: 'active',
          createdAt: new Date().toISOString()
        }]);
      }

      setShowRegistration(false);
      setEditingAd(null);
    } catch (error) {
      console.error('Failed to submit ad:', error);
      alert('광고 등록에 실패했습니다.');
    }
  };

  // 수정 버튼 클릭 시
  const handleEdit = (ad) => {
    setEditingAd(ad);
    setShowRegistration(true);
  };

  // 삭제 버튼 클릭 시
  const handleDelete = (adId) => {
    if (window.confirm('이 광고를 삭제하시겠습니까?')) {
      setAds(prev => prev.filter(ad => ad._id !== adId));
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowRegistration(false);
    setEditingAd(null);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">광고 관리</h1>
            <p className="mt-1 text-sm text-gray-500">
              등록된 광고를 관리하고 새로운 광고를 생성하세요.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingAd(null);  // 새 광고 등록시에는 editingAd 초기화
              setShowRegistration(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            새 광고 만들기
          </button>
        </div>

        {/* Ads List */}
        <div className="bg-white shadow rounded-lg">
          {ads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상품 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      카테고리
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      예산
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ads.map((ad) => (
                    <tr key={ad._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {ad.productInfo?.thumbnail && (
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                src={ad.productInfo.thumbnail}
                                alt=""
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {ad.productInfo?.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {ad.productInfo?.price}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ad.category.product}
                        </div>
                        <div className="text-sm text-gray-500">
                          타겟: {ad.category.target.length}개 카테고리
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          일일: {ad.budget.daily.toLocaleString()}원
                        </div>
                        <div className="text-sm text-gray-500">
                          총: {ad.budget.total.toLocaleString()}원
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${ad.status === 'active' ? 'bg-green-100 text-green-800' : 
                          ad.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}
                        >
                          {ad.status === 'active' ? '진행중' : 
                           ad.status === 'paused' ? '일시중지' : '종료'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(ad)}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(ad._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                등록된 광고가 없습니다. 새로운 광고를 등록해보세요.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Ad Registration Modal */}
      <AdRegistration
        isOpen={showRegistration}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingAd}
      />
    </Layout>
  );
};

export default Products;