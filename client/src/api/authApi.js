import axios from 'axios';

// Helper function to get the token
const getToken = () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return userInfo ? userInfo.token : null;
    } catch (e) {
        return null;
    }
};

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const sendOtp = async (phoneNumber) => {
  const response = await axios.post('/api/auth/send-otp', { phoneNumber });
  return response.data;
};

export const verifyOtp = async (phoneNumber, otp) => {
  const response = await axios.post('/api/auth/verify-otp', { phoneNumber, otp });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post('/api/auth/logout');
  return response.data;
};