const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err);
  
    // ValidationError 처리
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: '입력값 검증에 실패했습니다.',
        errors: Object.values(err.errors).map(error => error.message)
      });
    }
  
    // JWT 관련 에러 처리
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '유효하지 않은 토큰입니다.'
      });
    }
  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '토큰이 만료되었습니다.'
      });
    }
  
    // 기본 500 에러 처리
    res.status(500).json({
      success: false,
      message: '서버 내부 오류가 발생했습니다.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };
  
  module.exports = errorMiddleware;