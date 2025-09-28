import axios from 'axios';
import store from '../app/store'; // Import the Redux store

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// This interceptor will add the token to every request
api.interceptors.request.use(
  (config) => {
    // Get the current state from the Redux store
    const state = store.getState();
    const token = state.auth.userInfo?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;