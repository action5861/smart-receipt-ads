// backend/src/controllers/stats.controller.js
const mongoose = require('mongoose');
const Stats = require('../models/stats.model');
const Ad = require('../models/ad.model');

const statsController = {
  // 대시보드 통계 조회
  getDashboardStats: async (req, res) => {
    try {
      const advertiserId = req.userId;

      // 테스트용 임시 데이터
      const dashboardData = {
        realTimeStats: {
          activeAds: 5,
          totalBudget: 1000000,
          remainingBudget: 750000,
          conversionRate: 3.2,
          monthlySettlement: 250000
        },
        performance: {
          views: 1500,
          clicks: 75,
          conversions: 10,
          ctr: 5.0,
          cvr: 13.3
        },
        budgetStatus: {
          daily: {
            limit: 100000,
            spent: 25000,
            remaining: 75000
          },
          total: {
            limit: 1000000,
            spent: 250000,
            remaining: 750000
          }
        }
      };

      res.json({
        success: true,
        data: dashboardData
      });

    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({
        success: false,
        message: '통계 데이터 조회 중 오류가 발생했습니다.'
      });
    }
  },

  // 실시간 성과 업데이트
  updatePerformance: async (req, res) => {
    try {
      const advertiserId = req.userId;
      const { views, clicks, conversions } = req.body;

      const performanceData = {
        views,
        clicks,
        conversions,
        ctr: clicks > 0 ? (clicks / views) * 100 : 0,
        cvr: conversions > 0 ? (conversions / clicks) * 100 : 0
      };

      res.json({
        success: true,
        data: performanceData
      });

    } catch (error) {
      console.error('Performance update error:', error);
      res.status(500).json({
        success: false,
        message: '성과 지표 업데이트 중 오류가 발생했습니다.'
      });
    }
  }
};

module.exports = statsController;