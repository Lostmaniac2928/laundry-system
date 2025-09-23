import axios from 'axios';

const API_URL = '/api/orders';

// Fetch the logged-in user's orders
export const getMyOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new order
export const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};