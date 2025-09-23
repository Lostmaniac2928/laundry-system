import axios from 'axios';

// Use the full URL from the environment variable for production
const API_URL = import.meta.env.VITE_API_URL || '';

// Fetch all services from the backend
export const getServices = async () => {
  const response = await axios.get(`${API_URL}/api/services`);
  return response.data;
};