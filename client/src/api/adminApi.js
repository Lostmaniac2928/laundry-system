import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/stats`);
  return response.data;
};

export const createService = async (serviceData) => {
    const response = await axios.post(`${API_BASE_URL}/api/services`, serviceData);
    return response.data;
}

export const updateService = async (id, serviceData) => {
    const response = await axios.put(`${API_BASE_URL}/api/services/${id}`, serviceData);
    return response.data;
}

export const deleteService = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/api/services/${id}`);
    return response.data;
}

export const getAllOrders = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/orders/all`);
    return response.data;
}

export const updateOrderStatus = async (id, status) => {
    const response = await axios.put(`${API_BASE_URL}/api/orders/${id}/status`, { status });
    return response.data;
}