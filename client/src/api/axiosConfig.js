import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// This interceptor will add the token to every request
api.interceptors.request.use(
  (config) => {
    try {
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        if (userInfo && userInfo.token) {
          config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
      }
    } catch (e) {
      console.error('Error parsing user info from localStorage', e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;