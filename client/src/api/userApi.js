import axios from 'axios';

// Get the full backend URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const getToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token;

export const addLocation = async (locationData) => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  // Prepend the full backend URL
  const response = await axios.post(`${API_BASE_URL}/api/users/locations`, locationData, config);
  return response.data;
};

export const getProfile = async () => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    // Prepend the full backend URL
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, config);
    return response.data;
}

export const getUserStats = async () => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    // Prepend the full backend URL
    const response = await axios.get(`${API_BASE_URL}/api/users/stats`, config);
    return response.data;
}