// backend/src/routes/stats.routes.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');
const authMiddleware = require('../middleware/auth.middleware');

// 인증 미들웨어 적용
router.use(authMiddleware);

// 대시보드 통계 - getDashboardStats를 getDashboard로 수정
router.get('/dashboard', statsController.getDashboardStats);

// 실시간 성과 업데이트
router.post('/performance', statsController.updatePerformance);

module.exports = router;