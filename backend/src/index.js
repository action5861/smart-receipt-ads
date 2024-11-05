require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const adRoutes = require('./routes/ad.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug 로그 추가
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// 라우트 (중복 제거)
app.use('/api/auth', authRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/stats', statsRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date()
  });
});

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-receipt-ads')
  .then(() => {
    console.log('✅ MongoDB Connected');
    
    // 서버 시작
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 API routes loaded:
        - /api/auth
        - /api/ads
        - /api/stats   // stats 라우트 추가됨
      `);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });