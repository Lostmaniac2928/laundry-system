import axios from 'axios';

export const getDashboardStats = async () => {
  const response = await axios.get('/api/admin/stats');
  return response.data;
};
export const createService = async (serviceData) => {
    const response = await axios.post('/api/services', serviceData);
    return response.data;
}
// ... and so on for updateService, deleteService, etc.