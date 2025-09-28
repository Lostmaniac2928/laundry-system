import axios from 'axios';

const getToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token;

export const addLocation = async (locationData) => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  const response = await axios.post('/api/users/locations', locationData, config);
  return response.data;
};

export const getProfile = async () => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.get('/api/users/profile', config);
    return response.data;
}

export const getUserStats = async () => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.get('/api/users/stats', config);
    return response.data;
}