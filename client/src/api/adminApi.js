import axios from 'axios';

const getToken = () => JSON.parse(localStorage.getItem('userInfo'))?.token;

export const getDashboardStats = async () => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  const response = await axios.get('/api/admin/stats', config);
  return response.data;
};

export const createService = async (serviceData) => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.post('/api/services', serviceData, config);
    return response.data;
}

export const updateService = async (id, serviceData) => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.put(`/api/services/${id}`, serviceData, config);
    return response.data;
}

export const deleteService = async (id) => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.delete(`/api/services/${id}`, config);
    return response.data;
}

export const getAllOrders = async () => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.get('/api/orders/all', config);
    return response.data;
}

export const updateOrderStatus = async (id, status) => {
    const config = { headers: { Authorization: `Bearer ${getToken()}` } };
    const response = await axios.put(`/api/orders/${id}/status`, { status }, config);
    return response.data;
}