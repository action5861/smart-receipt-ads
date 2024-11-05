const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productUrl: {
    type: String,
    required: [true, '상품 URL은 필수입니다']
  },
  productInfo: {
    title: {
      type: String,
      required: [true, '상품명은 필수입니다']
    },
    price: String,
    thumbnail: String
  },
  category: {
    product: {
      type: String,
      required: [true, '상품 카테고리는 필수입니다']
    },
    target: [{
      type: String,
      required: [true, '타겟 카테고리는 필수입니다']
    }]
  },
  message: {
    text: {
      type: String,
      required: [true, '광고 메시지는 필수입니다'],
      maxlength: [200, '메시지는 200자를 초과할 수 없습니다']
    },
    couponCode: String
  },
  budget: {
    daily: {
      type: Number,
      required: [true, '일일 예산은 필수입니다'],
      min: [10000, '일일 예산은 최소 10,000원 이상이어야 합니다']
    },
    total: {
      type: Number,
      required: [true, '총 예산은 필수입니다'],
      min: [100000, '총 예산은 최소 100,000원 이상이어야 합니다']
    },
    spent: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'completed'],
    default: 'active'
  },
  statistics: {
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// updatedAt 자동 업데이트
adSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Ad', adSchema);