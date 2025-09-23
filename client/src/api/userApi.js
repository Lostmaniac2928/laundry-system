import axios from 'axios';

const API_URL = '/api/users';

// Add a new location for the logged-in user
export const addLocation = async (locationData) => {
  const response = await axios.post(`${API_URL}/locations`, locationData);
  return response.data;
};

// Get the logged-in user's profile data
export const getProfile = async () => {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
}

// Get the logged-in user's order stats
export const getUserStats = async () => {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data;
}