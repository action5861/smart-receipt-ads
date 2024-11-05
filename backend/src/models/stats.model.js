const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  advertiserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advertiser',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  realTimeStats: {
    activeAds: Number,
    totalBudget: Number,
    remainingBudget: Number,
    conversionRate: Number,
    monthlySettlement: Number
  },
  performance: {
    views: Number,
    clicks: Number,
    conversions: Number,
    ctr: Number,  // Click Through Rate
    cvr: Number   // Conversion Rate
  },
  budgetStatus: {
    daily: {
      limit: Number,
      spent: Number,
      remaining: Number
    },
    total: {
      limit: Number,
      spent: Number,
      remaining: Number
    }
  },
  hourlyData: [{
    hour: Number,
    views: Number,
    clicks: Number,
    conversions: Number,
    spent: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Stats', statsSchema);