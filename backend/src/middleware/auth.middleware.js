const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: '인증 토큰이 필요합니다.'
      });
    }

    // Bearer 토큰에서 실제 토큰 부분만 추출
    const token = authHeader.split(' ')[1];

    try {
      // 토큰 검증
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // req 객체에 사용자 ID 추가
      req.userId = decoded.id;
      
      next();
    } catch (err) {
      // 토큰 검증 실패
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: '인증 토큰이 만료되었습니다.'
        });
      }

      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: '유효하지 않은 토큰입니다.'
        });
      }

      throw err;
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: '인증 처리 중 오류가 발생했습니다.'
    });
  }
};

module.exports = authMiddleware;