import axios from 'axios';

// The base URL should be an empty string for local development
const API_BASE_URL = '';

export const getServices = async () => {
  // The request path should be relative
  const response = await axios.get(`${API_BASE_URL}/api/services`);
  return response.data;
};