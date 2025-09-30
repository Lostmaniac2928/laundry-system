import axios from 'axios';

// Get the full backend URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const getToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token;

export const getMyOrders = async () => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  // Prepend the full backend URL
  const response = await axios.get(`${API_BASE_URL}/api/orders`, config);
  return response.data;
};

export const createOrder = async (orderData) => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  // Prepend the full backend URL
  const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData, config);
  return response.data;
};