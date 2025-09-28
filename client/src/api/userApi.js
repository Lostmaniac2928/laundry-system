import api from './axiosConfig';

export const addLocation = async (locationData) => {
  const response = await api.post('/api/users/locations', locationData);
  return response.data;
};
export const getProfile = async () => {
    const response = await api.get('/api/users/profile');
    return response.data;
}
export const getUserStats = async () => {
    const response = await api.get('/api/users/stats');
    return response.data;
}