import axios from 'axios';
import store from '../app/store';
import { logout } from '../app/features/authSlice'; // Import the logout action

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.userInfo?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors (invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch the logout action to clear the invalid user data
      store.dispatch(logout());
      // Optionally, redirect to login page
      // window.location.href = '/login'; 
      alert('Your session has expired. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export default api;