import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const options = { withCredentials: true };

// --- Dashboard ---
export const getDashboardStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/stats`, options);
  return response.data;
};

// --- Services ---
export const createService = async (serviceData) => {
    const response = await axios.post(`${API_BASE_URL}/api/services`, serviceData, options);
    return response.data;
}
export const updateService = async (id, serviceData) => {
    const response = await axios.put(`${API_-BASE_URL}/api/services/${id}`, serviceData, options);
    return response.data;
}
export const deleteService = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/api/services/${id}`, options);
    return response.data;
}

// --- Orders ---
export const getAllOrders = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/orders/all`, options);
    return response.data;
}
export const updateOrderStatus = async (id, status) => {
    const response = await axios.put(`${API_BASE_URL}/api/orders/${id}/status`, { status }, options);
    return response.data;
}