import axios from 'axios';

const getToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token;

export const getMyOrders = async () => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  const response = await axios.get('/api/orders', config);
  return response.data;
};

export const createOrder = async (orderData) => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  const response = await axios.post('/api/orders', orderData, config);
  return response.data;
};