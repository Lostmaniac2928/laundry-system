import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const options = { withCredentials: true };

export const sendOtp = async (phoneNumber) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, { phoneNumber }, options);
  return response.data;
};

export const verifyOtp = async (phoneNumber, otp) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { phoneNumber, otp }, options);
  return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, options);
    return response.data;
}