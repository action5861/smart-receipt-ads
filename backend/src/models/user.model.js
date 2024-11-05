const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, '회사명은 필수입니다']
  },
  email: {
    type: String,
    required: [true, '이메일은 필수입니다'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다'],
    minlength: 6
  },
  businessNumber: {
    type: String,
    required: [true, '사업자등록번호는 필수입니다'],
    unique: true
  },
  representativeName: {
    type: String,
    required: [true, '담당자명은 필수입니다']
  },
  phoneNumber: {
    type: String,
    required: [true, '연락처는 필수입니다']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 비밀번호 해싱 미들웨어
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 비밀번호 확인 메서드
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);