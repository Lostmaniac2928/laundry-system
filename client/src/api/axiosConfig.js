import axios from 'axios';

const api = axios.create({
  baseURL: '', // Relative path for unified deployment
});

api.interceptors.request.use(
  (config) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    } catch (e) {
      console.error('Error handling token', e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;