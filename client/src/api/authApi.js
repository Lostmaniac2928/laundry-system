import axios from 'axios';

// Get the full backend URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function to get the token from localStorage
const getToken = () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return userInfo ? userInfo.token : null;
    } catch (e) {
        return null;
    }
};

export const sendOtp = async (phoneNumber) => {
  // Prepend the full backend URL to the request path
  const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, { phoneNumber });
  return response.data;
};

export const verifyOtp = async (phoneNumber, otp) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { phoneNumber, otp });
  return response.data;
};

export const logout = async () => {
  const config = {
      headers: { Authorization: `Bearer ${getToken()}` }
  };
  const response = await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, config);
  return response.data;
};