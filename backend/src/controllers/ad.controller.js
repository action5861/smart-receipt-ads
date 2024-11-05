const Ad = require('../models/ad.model');

const adController = {
  // 광고 등록
  create: async (req, res) => {
    try {
      const { productUrl, productInfo, category, message, budget } = req.body;

      const ad = new Ad({
        userId: req.userId, // auth 미들웨어에서 설정된 userId
        productUrl,
        productInfo,
        category,
        message,
        budget
      });

      await ad.save();

      res.status(201).json({
        success: true,
        message: '광고가 등록되었습니다.',
        data: ad
      });

    } catch (error) {
      console.error('Create ad error:', error);
      res.status(500).json({
        success: false,
        message: '광고 등록 중 오류가 발생했습니다.',
        error: error.message
      });
    }
  },

  // 광고 목록 조회
  getList: async (req, res) => {
    try {
      const ads = await Ad.find({ userId: req.userId })
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: ads
      });

    } catch (error) {
      console.error('Get ads error:', error);
      res.status(500).json({
        success: false,
        message: '광고 목록 조회 중 오류가 발생했습니다.'
      });
    }
  },

  // 광고 상세 조회
  getOne: async (req, res) => {
    try {
      const ad = await Ad.findOne({
        _id: req.params.id,
        userId: req.userId
      });

      if (!ad) {
        return res.status(404).json({
          success: false,
          message: '광고를 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        data: ad
      });

    } catch (error) {
      console.error('Get ad error:', error);
      res.status(500).json({
        success: false,
        message: '광고 조회 중 오류가 발생했습니다.'
      });
    }
  },

  // 광고 수정
  update: async (req, res) => {
    try {
      const ad = await Ad.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId
        },
        req.body,
        { new: true }
      );

      if (!ad) {
        return res.status(404).json({
          success: false,
          message: '광고를 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        message: '광고가 수정되었습니다.',
        data: ad
      });

    } catch (error) {
      console.error('Update ad error:', error);
      res.status(500).json({
        success: false,
        message: '광고 수정 중 오류가 발생했습니다.'
      });
    }
  },

  // 광고 상태 변경
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const ad = await Ad.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId
        },
        { status },
        { new: true }
      );

      if (!ad) {
        return res.status(404).json({
          success: false,
          message: '광고를 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        message: '광고 상태가 변경되었습니다.',
        data: ad
      });

    } catch (error) {
      console.error('Update ad status error:', error);
      res.status(500).json({
        success: false,
        message: '상태 변경 중 오류가 발생했습니다.'
      });
    }
  },

  // 광고 삭제
  delete: async (req, res) => {
    try {
      const ad = await Ad.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId
      });

      if (!ad) {
        return res.status(404).json({
          success: false,
          message: '광고를 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        message: '광고가 삭제되었습니다.'
      });

    } catch (error) {
      console.error('Delete ad error:', error);
      res.status(500).json({
        success: false,
        message: '광고 삭제 중 오류가 발생했습니다.'
      });
    }
  }
};

module.exports = adController;