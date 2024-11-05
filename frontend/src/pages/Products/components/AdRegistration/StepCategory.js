import React from 'react';

const categories = {
  '스킨케어': ['클렌징', '토너', '에센스', '크림', '선케어'],
  '메이크업': ['베이스', '아이', '립', '치크'],
  '헤어케어': ['샴푸', '트리트먼트', '에센스', '스타일링'],
  '바디케어': ['워시', '로션', '크림', '핸드케어'],
  '향수/디퓨저': ['여성향수', '남성향수', '디퓨저', '캔들']
};

const StepCategory = ({ category, onUpdate }) => {
  const handleProductCategoryChange = (main, sub = '') => {
    onUpdate({
      ...category,
      product: sub ? `${main}>${sub}` : main
    });
  };

  const handleTargetCategoryChange = (main, sub = '') => {
    const fullCategory = sub ? `${main}>${sub}` : main;
    let newTargets = [...category.target];

    if (newTargets.includes(fullCategory)) {
      newTargets = newTargets.filter(cat => cat !== fullCategory);
    } else {
      newTargets.push(fullCategory);
    }

    onUpdate({
      ...category,
      target: newTargets
    });
  };

  return (
    <div className="space-y-6">
      {/* Product Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          내 상품 카테고리
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
              value={category.product.split('>')[0]}
              onChange={(e) => handleProductCategoryChange(e.target.value)}
            >
              <option value="">대분류 선택</option>
              {Object.keys(categories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {category.product && (
              <select
                className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                value={category.product.split('>')[1] || ''}
                onChange={(e) => handleProductCategoryChange(
                  category.product.split('>')[0],
                  e.target.value
                )}
              >
                <option value="">소분류 선택</option>
                {categories[category.product.split('>')[0]]?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Target Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          타겟 카테고리 (다중 선택 가능)
        </label>
        <div className="mt-2 space-y-4">
          {Object.entries(categories).map(([main, subs]) => (
            <div key={main} className="border rounded-lg p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={category.target.includes(main)}
                  onChange={() => handleTargetCategoryChange(main)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-900">{main}</label>
              </div>
              <div className="mt-2 ml-6 grid grid-cols-2 gap-2">
                {subs.map(sub => (
                  <div key={sub} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={category.target.includes(`${main}>${sub}`)}
                      onChange={() => handleTargetCategoryChange(main, sub)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-500">{sub}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepCategory;