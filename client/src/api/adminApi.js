import axios from 'axios';

// Get the full backend URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const getToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token;

export const getDashboardStats = async () => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  // Prepend the full backend URL
  const response = await axios.get(`${API_BASE_URL}/api/admin/stats`, config);
  return response.data;
};

export const createService = async (serviceData) => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    // Prepend the full backend URL
    const response = await axios.post(`${API_BASE_URL}/api/services`, serviceData, config);
    return response.data;
}

export const updateService = async (id, serviceData) => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    // Prepend the full backend URL
    const response = await axios.put(`${API_BASE_URL}/api/services/${id}`, serviceData, config);
    return response.data;
}

export const deleteService = async (id) => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    // Prepend the full backend URL
    const response = await axios.delete(`${API_BASE_URL}/api/services/${id}`, config);
    return response.data;
}

export const getAllOrders = async () => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    // Prepend the full backend URL
    const response = await axios.get(`${API_BASE_URL}/api/orders/all`, config);
    return response.data;
}

export const updateOrderStatus = async (id, status) => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    // Prepend the full backend URL
    const response = await axios.put(`${API_BASE_URL}/api/orders/${id}/status`, { status }, config);
    return response.data;
}