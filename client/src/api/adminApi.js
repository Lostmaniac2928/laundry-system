import axios from 'axios';

const ADMIN_API_URL = '/api/admin';
const SERVICES_API_URL = '/api/services';
const ORDERS_API_URL = '/api/orders';

// --- Dashboard ---
export const getDashboardStats = async () => {
  const response = await axios.get(`${ADMIN_API_URL}/stats`);
  return response.data;
};

// --- Services ---
export const createService = async (serviceData) => {
    const response = await axios.post(SERVICES_API_URL, serviceData);
    return response.data;
}
export const updateService = async (id, serviceData) => {
    const response = await axios.put(`${SERVICES_API_URL}/${id}`, serviceData);
    return response.data;
}
export const deleteService = async (id) => {
    const response = await axios.delete(`${SERVICES_API_URL}/${id}`);
    return response.data;
}

// --- Orders ---
export const getAllOrders = async () => {
    const response = await axios.get(`${ORDERS_API_URL}/all`);
    return response.data;
}
export const updateOrderStatus = async (id, status) => {
    const response = await axios.put(`${ORDERS_API_URL}/${id}/status`, { status });
    return response.data;
}