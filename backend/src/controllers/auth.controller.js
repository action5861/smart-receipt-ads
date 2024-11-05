const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// JWT 토큰 생성 함수
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const authController = {
  // 회원가입
  register: async (req, res) => {
    try {
      const {
        companyName,
        email,
        password,
        businessNumber,
        representativeName,
        phoneNumber
      } = req.body;

      // 이메일 중복 확인
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: '이미 등록된 이메일입니다.'
        });
      }

      // 사업자번호 중복 확인
      const existingBusiness = await User.findOne({ businessNumber });
      if (existingBusiness) {
        return res.status(400).json({
          success: false,
          message: '이미 등록된 사업자등록번호입니다.'
        });
      }

      // 새 사용자 생성
      const user = new User({
        companyName,
        email,
        password,
        businessNumber,
        representativeName,
        phoneNumber
      });

      await user.save();

      // 비밀번호 제외하고 사용자 정보 전송
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json({
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: userResponse
      });

    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        success: false,
        message: '회원가입 처리 중 오류가 발생했습니다.',
        error: error.message
      });
    }
  },

  // 로그인
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 사용자 찾기
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.'
        });
      }

      // 비밀번호 확인
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.'
        });
      }

      // 토큰 생성
      const token = generateToken(user._id);

      // 비밀번호 제외하고 사용자 정보 전송
      const userResponse = user.toObject();
      delete userResponse.password;

      res.json({
        success: true,
        message: '로그인 성공',
        data: {
          token,
          user: userResponse
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: '로그인 처리 중 오류가 발생했습니다.',
        error: error.message
      });
    }
  },

  // 현재 사용자 정보 조회
  me: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '사용자를 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        data: user
      });

    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        message: '사용자 정보 조회 중 오류가 발생했습니다.',
        error: error.message
      });
    }
  },

  // 비밀번호 변경
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(req.userId);

      // 현재 비밀번호 확인
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: '현재 비밀번호가 올바르지 않습니다.'
        });
      }

      // 새 비밀번호 설정
      user.password = newPassword;
      await user.save();

      res.json({
        success: true,
        message: '비밀번호가 성공적으로 변경되었습니다.'
      });

    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        success: false,
        message: '비밀번호 변경 중 오류가 발생했습니다.',
        error: error.message
      });
    }
  }
};

module.exports = authController;