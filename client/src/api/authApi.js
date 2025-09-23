import axios from 'axios';

// The base URL for our backend API
const API_URL = '/api/auth'; // Using a relative URL for proxy

// Send a request to the backend to generate and send an OTP
export const sendOtp = async (phoneNumber) => {
  const response = await axios.post(`${API_URL}/send-otp`, { phoneNumber });
  return response.data;
};

// Send the phone number and OTP to the backend for verification
export const verifyOtp = async (phoneNumber, otp) => {
  const response = await axios.post(`${API_URL}/verify-otp`, { phoneNumber, otp });
  return response.data;
};

// Send a request to log the user out
export const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
}