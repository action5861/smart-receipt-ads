import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import StepURL from './StepURL';
import StepCategory from './StepCategory';
import StepMessage from './StepMessage';
import StepBudget from './StepBudget';

const steps = [
  { id: 1, name: 'URL 입력' },
  { id: 2, name: '카테고리 설정' },
  { id: 3, name: '메시지 작성' },
  { id: 4, name: '예산 설정' },
];

const AdRegistration = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    url: '',
    productInfo: null,
    category: {
      product: '',
      target: []
    },
    message: {
      text: '',
      couponCode: ''
    },
    budget: {
      daily: 50000,
      total: 500000
    }
  });

  // initialData가 있으면 폼 데이터 초기화
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // 새 광고 등록시 초기화
      setFormData({
        url: '',
        productInfo: null,
        category: {
          product: '',
          target: []
        },
        message: {
          text: '',
          couponCode: ''
        },
        budget: {
          daily: 50000,
          total: 500000
        }
      });
    }
  }, [initialData, isOpen]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
      setCurrentStep(1);
    } catch (error) {
      console.error('Ad registration failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-2xl">
            {/* Header */}
            <div className="bg-white px-4 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {initialData ? '광고 수정' : '새 광고 등록'}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center ${
                        step.id < currentStep ? 'text-primary-600' :
                        step.id === currentStep ? 'text-primary-600' :
                        'text-gray-400'
                      }`}
                    >
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                        ${step.id < currentStep ? 'border-primary-600 bg-primary-600 text-white' :
                          step.id === currentStep ? 'border-primary-600 text-primary-600' :
                          'border-gray-300'
                        }`}
                      >
                        {step.id}
                      </span>
                      <span className="ml-2 text-sm">{step.name}</span>
                      {step.id !== 4 && (
                        <div className={`w-full h-0.5 mx-4 ${
                          step.id < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white px-4 py-5">
              {currentStep === 1 && (
                <StepURL
                  url={formData.url}
                  productInfo={formData.productInfo}
                  onUpdate={(url, info) => {
                    updateFormData('url', url);
                    updateFormData('productInfo', info);
                  }}
                />
              )}
              {currentStep === 2 && (
                <StepCategory
                  category={formData.category}
                  onUpdate={(category) => updateFormData('category', category)}
                />
              )}
              {currentStep === 3 && (
                <StepMessage
                  message={formData.message}
                  onUpdate={(message) => updateFormData('message', message)}
                />
              )}
              {currentStep === 4 && (
                <StepBudget
                  budget={formData.budget}
                  onUpdate={(budget) => updateFormData('budget', budget)}
                />
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  이전
                </button>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={currentStep === 4 ? handleSubmit : handleNext}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
                >
                  {currentStep === 4 ? (initialData ? '수정 완료' : '등록 완료') : '다음'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdRegistration;