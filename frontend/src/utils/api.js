import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  me: () => api.get('/auth/me'),
};

export const adAPI = {
  create: (data) => api.post('/ads', data),
  list: () => api.get('/ads'),
  get: (id) => api.get(`/ads/${id}`),
  update: (id, data) => api.put(`/ads/${id}`, data),
  updateStatus: (id, status) => api.patch(`/ads/${id}/status`, { status }),
  delete: (id) => api.delete(`/ads/${id}`),
};

export const statsAPI = {
  getDashboard: () => api.get('/stats/dashboard'),
  getPerformance: (period) => api.get(`/stats/performance?period=${period}`),
  getNotifications: () => api.get('/stats/notifications'),
  getTransactions: () => api.get('/stats/transactions'),
};

export default api;