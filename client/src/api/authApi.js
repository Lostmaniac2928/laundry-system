import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const sendOtp = async (phoneNumber) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, { phoneNumber });
  return response.data;
};

export const verifyOtp = async (phoneNumber, otp) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { phoneNumber, otp });
  return response.data;
};

// The function was incorrectly named 'logoutUser'. It has been corrected to 'logout'.
export const logout = async () => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/logout`);
    return response.data;
}