import axios from 'axios';

const API_BASE_URL = '';

const getToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token;

export const sendOtp = async (phoneNumber) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, { phoneNumber });
  return response.data;
};

export const verifyOtp = async (phoneNumber, otp) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { phoneNumber, otp });
  return response.data;
};

export const logout = async () => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  const response = await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, config);
  return response.data;
};