import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const options = { withCredentials: true };

// Add a new location for the logged-in user
export const addLocation = async (locationData) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/locations`, locationData, options);
  return response.data;
};

// Get the logged-in user's profile data
export const getProfile = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, options);
    return response.data;
}

// Get the logged-in user's order stats
export const getUserStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/users/stats`, options);
    return response.data;
}