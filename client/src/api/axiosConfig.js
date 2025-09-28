import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Create a central axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;