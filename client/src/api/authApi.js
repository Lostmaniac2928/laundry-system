import api from './axiosConfig';

export const sendOtp = async (phoneNumber) => {
  const response = await api.post('/api/auth/send-otp', { phoneNumber });
  return response.data;
};
export const verifyOtp = async (phoneNumber, otp) => {
  const response = await api.post('/api/auth/verify-otp', { phoneNumber, otp });
  return response.data;
};
export const logout = async () => {
  const response = await api.post('/api/auth/logout');
  return response.data;
};