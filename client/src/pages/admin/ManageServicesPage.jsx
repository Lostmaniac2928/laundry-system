import React, 'useState, useEffect } from 'react';
import { apiFetch } from '../../api/apiHelper';
import AdminMenu from '../../components/admin/AdminMenu';

const ManageServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [packages, setPackages] = useState([{ name: '', price: '' }]);
  const isEditing = id !== null;

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/api/services');
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const clearForm = () => {
    setId(null); setName(''); setDescription(''); setImageUrl(''); setPackages([{ name: '', price: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceData = { name, description, imageUrl, packages };
    try {
      if (isEditing) {
        await apiFetch(`/api/services/${id}`, { method: 'PUT', body: JSON.stringify(serviceData) });
      } else {
        await apiFetch('/api/services', { method: 'POST', body: JSON.stringify(serviceData) });
      }
      clearForm();
      fetchServices(); // Refetch services to show the update
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteClick = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
        try {
            await apiFetch(`/api/services/${serviceId}`, { method: 'DELETE' });
            fetchServices(); // Refetch services
        } catch (err) {
            setError(err.message);
        }
    }
  };
  
  // Other functions like handlePackageChange, handleEditClick, etc. remain the same as before
  // ...

  return (
    <div className="profile-page-container">
      <AdminMenu />
      <main className="profile-content">
        {/* ... form and table JSX ... */}
      </main>
    </div>
  );
};
export default ManageServicesPage;