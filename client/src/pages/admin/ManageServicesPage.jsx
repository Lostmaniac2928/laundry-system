import React, { useState, useEffect } from 'react'; // This is the corrected line
import { useDispatch, useSelector } from 'react-redux';
import { createService, fetchServices, updateService, deleteService } from '../../app/features/serviceSlice';
import AdminMenu from '../../components/admin/AdminMenu';

const ManageServicesPage = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  // Form state
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [packages, setPackages] = useState([{ name: '', price: '' }]);

  const isEditing = id !== null;

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handlePackageChange = (index, event) => {
    const values = [...packages];
    values[index][event.target.name] = event.target.value;
    setPackages(values);
  };

  const handleAddPackage = () => {
    setPackages([...packages, { name: '', price: '' }]);
  };

  const handleRemovePackage = (index) => {
    if (packages.length > 1) {
      const values = [...packages];
      values.splice(index, 1);
      setPackages(values);
    }
  };

  const clearForm = () => {
    setId(null);
    setName('');
    setDescription('');
    setImageUrl('');
    setPackages([{ name: '', price: '' }]);
  };

  const handleEditClick = (service) => {
    setId(service._id);
    setName(service.name);
    setDescription(service.description);
    setImageUrl(service.imageUrl);
    if (service.packages && service.packages.length > 0) {
      setPackages(service.packages);
    } else {
      setPackages([{ name: '', price: '' }]);
    }
  };

  const handleDeleteClick = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      dispatch(deleteService(serviceId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceData = { name, description, imageUrl, packages };
    if (isEditing) {
      dispatch(updateService({ id, serviceData }));
    } else {
      dispatch(createService(serviceData));
    }
    clearForm();
  };

  return (
    <div className="profile-page-container">
      <AdminMenu />
      <main className="profile-content">
        <div className="admin-page-content">
          <div className="admin-form-container">
            <h2>{isEditing ? 'Edit Service' : 'Create New Service'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Service Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="6" className="description-textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required placeholder="e.g., /images/my-image.jpg" />
              </div>

              <div className="form-group">
                <label>Packages</label>
                {packages.map((pkg, index) => (
                  <div key={index} className="package-input-group">
                    <input type="text" name="name" placeholder="Package Name" value={pkg.name} onChange={(event) => handlePackageChange(index, event)} required />
                    <input type="number" name="price" placeholder="Price (₹)" value={pkg.price} onChange={(event) => handlePackageChange(index, event)} required />
                    <button type="button" className="btn-remove-pkg" onClick={() => handleRemovePackage(index)}>×</button>
                  </div>
                ))}
                <button type="button" className="btn-add-pkg" onClick={handleAddPackage}>+ Add Package</button>
              </div>

              <button type="submit" disabled={loading}>{isEditing ? 'Update Service' : 'Create Service'}</button>
              {isEditing && <button type="button" className="btn-cancel" onClick={clearForm}>Cancel Edit</button>}
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>

          <div className="admin-list-container">
            <h2>Existing Services</h2>
            {loading ? <p>Loading...</p> : (
                 <table className="orders-table">
                 <thead>
                   <tr>
                     <th>Name</th>
                     <th>Packages</th>
                     <th>Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {services && services.map(service => (
                     <tr key={service._id}>
                       <td>{service.name}</td>
                       <td>{service.packages?.length || 0}</td>
                       <td className="actions-cell">
                         <button className="btn-edit" onClick={() => handleEditClick(service)}>Edit</button>
                         <button className="btn-delete" onClick={() => handleDeleteClick(service._id)}>Delete</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageServicesPage;