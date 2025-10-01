import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../app/features/cartSlice';

const ServiceDetailPage = () => {
  const { id: serviceId } = useParams();
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.services);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const service = services.find(s => s._id === serviceId);

  const handleAddToCart = (pkg) => {
    const itemToAdd = {
        packageId: pkg._id,
        name: pkg.name,
        price: pkg.price,
        serviceId: service._id,
        serviceName: service.name,
        imageUrl: service.imageUrl,
    };
    dispatch(addToCart(itemToAdd));
    
    // Logic for the toast notification
    setToastMessage(`${pkg.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000); // Hide after 2 seconds
  };

  if (loading) {
    return <div className="container" style={{paddingTop: '80px'}}><p>Loading...</p></div>;
  }
  
  // ... (rest of the component remains the same)
  // ... but include the toast notification JSX at the end
  
  return (
    <div className="service-detail-page-container">
      <div className="service-detail-left">
        <h1>{service.name}</h1>
        <p>{service.description}</p>
      </div>
      
      <div className="service-packages-right">
        <h2>Select a Package</h2>
        <div className="packages-list">
            {service.packages && service.packages.length > 0 ? service.packages.map(pkg => (
                <div key={pkg._id} className="package-card">
                    <div className="package-info">
                        <h3>{pkg.name}</h3>
                        <span className="package-price">₹{pkg.price}</span>
                    </div>
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(pkg)}>
                        Add
                    </button>
                </div>
            )) : <p>No packages available for this service yet.</p>}
        </div>
      </div>
      
      {/* Toast Notification */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
};

export default ServiceDetailPage;