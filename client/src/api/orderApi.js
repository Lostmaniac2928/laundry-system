import api from './axiosConfig';

export const getMyOrders = async () => {
  const response = await api.get('/api/orders');
  return response.data;
};
export const createOrder = async (orderData) => {
  const response = await api.post('/api/orders', orderData);
  return response.data;
};