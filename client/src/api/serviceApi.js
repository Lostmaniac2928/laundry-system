import axios from 'axios';

export const getServices = async () => {
  const response = await axios.get('/api/services');
  return response.data;
};