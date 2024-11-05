const express = require('express');
const router = express.Router();
const adController = require('../controllers/ad.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { body } = require('express-validator');

// 모든 광고 라우트에 인증 미들웨어 적용
router.use(authMiddleware);

// 광고 등록 시 유효성 검사 규칙
const adValidation = [
  body('productUrl')
    .isURL()
    .withMessage('유효한 URL을 입력해주세요'),
  
  body('productInfo.title')
    .notEmpty()
    .withMessage('상품명은 필수입니다'),
  
  body('category.product')
    .notEmpty()
    .withMessage('상품 카테고리는 필수입니다'),
  
  body('category.target')
    .isArray()
    .withMessage('타겟 카테고리는 배열 형태여야 합니다')
    .notEmpty()
    .withMessage('최소 하나의 타겟 카테고리를 선택해주세요'),
  
  body('message.text')
    .notEmpty()
    .withMessage('광고 메시지는 필수입니다')
    .isLength({ max: 200 })
    .withMessage('메시지는 200자를 초과할 수 없습니다'),
  
  body('budget.daily')
    .isNumeric()
    .withMessage('일일 예산은 숫자여야 합니다')
    .isInt({ min: 10000 })
    .withMessage('일일 예산은 최소 10,000원 이상이어야 합니다'),
  
  body('budget.total')
    .isNumeric()
    .withMessage('총 예산은 숫자여야 합니다')
    .isInt({ min: 100000 })
    .withMessage('총 예산은 최소 100,000원 이상이어야 합니다')
];

// 상태 변경 시 유효성 검사 규칙
const statusValidation = [
  body('status')
    .isIn(['active', 'paused', 'completed'])
    .withMessage('유효하지 않은 상태값입니다')
];

// Routes
router.post('/', adValidation, adController.create);
router.get('/', adController.getList);
router.get('/:id', adController.getOne);
router.put('/:id', adValidation, adController.update);
router.patch('/:id/status', statusValidation, adController.updateStatus);
router.delete('/:id', adController.delete);

module.exports = router;