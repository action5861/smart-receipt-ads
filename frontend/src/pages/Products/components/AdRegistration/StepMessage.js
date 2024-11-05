import React, { useState } from 'react';
import { TagIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const MAX_MESSAGE_LENGTH = 80; // SMS 메시지 제한 길이
const MESSAGE_TEMPLATES = [
  {
    id: 1,
    title: '할인 프로모션',
    text: '지금 구매하시면 20% 할인! 🎉 특별 할인 쿠폰으로 합리적인 가격에 만나보세요.',
  },
  {
    id: 2,
    title: '신규 고객 특가',
    text: '첫 구매 고객님을 위한 특별 혜택! 📦 무료배송 + 사은품 증정!',
  },
  {
    id: 3,
    title: '재구매 유도',
    text: '이전 구매하신 제품과 함께 사용하면 좋은 추천 상품입니다. ✨',
  },
];

const StepMessage = ({ message, onUpdate }) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const handleMessageChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= MAX_MESSAGE_LENGTH) {
      onUpdate({
        ...message,
        text: newText,
      });
    }
  };

  const handleCouponCodeChange = (e) => {
    onUpdate({
      ...message,
      couponCode: e.target.value,
    });
  };

  const applyTemplate = (template) => {
    onUpdate({
      ...message,
      text: template.text,
    });
    setShowTemplates(false);
  };

  // URL이 포함된 전체 메시지 미리보기
  const getFullPreview = () => {
    let preview = message.text;
    if (message.couponCode) {
      preview += `\n쿠폰코드: ${message.couponCode}`;
    }
    preview += '\n구매하기 👉 [URL]';
    return preview;
  };

  return (
    <div className="space-y-6">
      {/* Message Templates */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            메시지 작성
          </label>
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
            템플릿 사용
          </button>
        </div>

        {showTemplates && (
          <div className="mb-4 p-4 bg-gray-50 rounded-md space-y-3">
            {MESSAGE_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="p-3 bg-white rounded border border-gray-200 cursor-pointer hover:border-primary-500"
                onClick={() => applyTemplate(template)}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {template.title}
                </div>
                <div className="text-sm text-gray-500">
                  {template.text}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-1">
          <textarea
            rows={4}
            value={message.text}
            onChange={handleMessageChange}
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="고객에게 전달될 메시지를 입력해주세요."
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>* URL은 자동으로 추가됩니다.</span>
            <span>{message.text.length} / {MAX_MESSAGE_LENGTH}자</span>
          </div>
        </div>
      </div>

      {/* Coupon Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          쿠폰 코드 (선택사항)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <TagIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={message.couponCode}
            onChange={handleCouponCodeChange}
            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="SALE20"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          쿠폰 코드가 있다면 입력해주세요. 메시지에 자동으로 포함됩니다.
        </p>
      </div>

      {/* Message Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          메시지 미리보기
        </label>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-sm whitespace-pre-line">
              {getFullPreview()}
            </p>
          </div>
          <p className="text-xs text-gray-500">
            * 실제 발송시 [URL] 부분이 상품 페이지 링크로 대체됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepMessage;