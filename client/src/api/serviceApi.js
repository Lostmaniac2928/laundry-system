import axios from 'axios';

// Get the full backend URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getServices = async () => {
  // Prepend the full backend URL to the request path
  const response = await axios.get(`${API_BASE_URL}/api/services`);
  return response.data;
};