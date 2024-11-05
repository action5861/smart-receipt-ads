const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

// 입력 유효성 검사 규칙
const registerValidation = [
  body('companyName')
    .not().isEmpty()
    .withMessage('회사명은 필수입니다'),
  
  body('email')
    .isEmail()
    .withMessage('유효한 이메일 주소를 입력해주세요')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('비밀번호는 최소 6자 이상이어야 합니다'),
  
  body('businessNumber')
    .matches(/^\d{10}$/)
    .withMessage('사업자등록번호는 10자리 숫자여야 합니다'),
  
  body('representativeName')
    .not().isEmpty()
    .withMessage('담당자명은 필수입니다'),
  
  body('phoneNumber')
    .matches(/^\d{10,11}$/)
    .withMessage('올바른 전화번호 형식이 아닙니다')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('유효한 이메일 주소를 입력해주세요')
    .normalizeEmail(),
  
  body('password')
    .not().isEmpty()
    .withMessage('비밀번호를 입력해주세요')
];

const changePasswordValidation = [
  body('currentPassword')
    .not().isEmpty()
    .withMessage('현재 비밀번호를 입력해주세요'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('새 비밀번호는 최소 6자 이상이어야 합니다')
];

// 라우트 설정
// 회원가입
router.post('/register', registerValidation, authController.register);

// 로그인
router.post('/login', loginValidation, authController.login);

// 현재 사용자 정보 조회 (인증 필요)
router.get('/me', authMiddleware, authController.me);

// 비밀번호 변경 (인증 필요)
router.post(
  '/change-password',
  [authMiddleware, changePasswordValidation],
  authController.changePassword
);

// 이메일 중복 체크
router.post('/check-email', 
  body('email').isEmail().withMessage('유효한 이메일 주소를 입력해주세요'),
  async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({ email });
      
      res.json({
        success: true,
        isAvailable: !existingUser,
        message: existingUser ? '이미 사용 중인 이메일입니다.' : '사용 가능한 이메일입니다.'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '이메일 확인 중 오류가 발생했습니다.'
      });
    }
  }
);

// 사업자번호 중복 체크
router.post('/check-business-number',
  body('businessNumber').matches(/^\d{10}$/).withMessage('올바른 사업자등록번호 형식이 아닙니다'),
  async (req, res) => {
    try {
      const { businessNumber } = req.body;
      const existingBusiness = await User.findOne({ businessNumber });
      
      res.json({
        success: true,
        isAvailable: !existingBusiness,
        message: existingBusiness ? '이미 등록된 사업자등록번호입니다.' : '사용 가능한 사업자등록번호입니다.'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '사업자등록번호 확인 중 오류가 발생했습니다.'
      });
    }
  }
);

module.exports = router;