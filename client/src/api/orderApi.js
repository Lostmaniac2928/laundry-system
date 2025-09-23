import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getMyOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/orders`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData);
  return response.data;
};