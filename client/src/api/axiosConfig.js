import axios from 'axios';
import store from '../app/store';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    // *** THIS IS THE TEST ***
    console.log("--- Axios Interceptor Firing ---");

    const state = store.getState();
    const token = state.auth.userInfo?.token;

    console.log("Token found in Redux state:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("--- Authorization header SET ---");
    } else {
      console.log("--- Authorization header NOT SET ---");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;