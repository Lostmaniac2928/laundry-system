import axios from 'axios';

const API_URL = '/api/services'; // Base URL for service endpoints

// Fetch all services from the backend
export const getServices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};