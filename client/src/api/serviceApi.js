import api from './axiosConfig';

export const getServices = async () => {
  const response = await api.get('/api/services');
  return response.data;
};