import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, error: authError, clearError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    businessNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    representativeName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    return () => clearError?.();
  }, [isAuthenticated, navigate, clearError]);

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }

    if (formData.password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.');
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.businessNumber)) {
      setError('사업자등록번호는 10자리 숫자여야 합니다.');
      return false;
    }

    if (!/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      setError('올바른 전화번호를 입력해주세요.');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // API 호출
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '회원가입 중 오류가 발생했습니다.');
      }

      // 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to home button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          홈으로
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          광고주 회원가입
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Smart Receipt Ads와 함께 시작하세요
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Error Message */}
          {(error || authError) && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
              {error || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                회사명
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className={inputStyle}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Business Number */}
            <div>
              <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700">
                사업자등록번호
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="businessNumber"
                  id="businessNumber"
                  required
                  value={formData.businessNumber}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="'-' 없이 입력해주세요"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputStyle}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="8자 이상 입력해주세요"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={inputStyle}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Representative Name */}
            <div>
              <label htmlFor="representativeName" className="block text-sm font-medium text-gray-700">
                담당자명
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="representativeName"
                  id="representativeName"
                  required
                  value={formData.representativeName}
                  onChange={handleChange}
                  className={inputStyle}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                연락처
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="'-' 없이 입력해주세요"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    처리 중...
                  </div>
                ) : (
                  '회원가입'
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  로그인
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;