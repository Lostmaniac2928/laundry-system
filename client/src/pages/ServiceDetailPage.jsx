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
        imageUrl: service.imageUrl, // Keeping this for cart display, even if not shown here
    };
    dispatch(addToCart(itemToAdd));
    
    setToastMessage(`${pkg.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  if (loading) {
    return <div className="container" style={{paddingTop: '80px'}}><p>Loading...</p></div>;
  }
  
  if (!service) {
    return (
      <div className="container" style={{paddingTop: '80px'}}>
        <h2>Service Not Found</h2>
        <p>The service you are looking for may have been removed.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
  
  return (
    <div className="service-detail-page-container">
      <div className="service-detail-left">
        {/* Removed the image display here as per your request */}
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
      
      {/* Toast notification positioned at the top right of its parent */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`} style={{
          position: 'fixed', // Use fixed to position relative to viewport
          top: '80px',      // Adjust as needed for spacing from top
          right: '20px',     // Adjust as needed for spacing from right
          backgroundColor: '#333',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          zIndex: 1000, // Ensure it's above other content
          transition: 'opacity 0.3s ease-in-out',
          opacity: showToast ? 1 : 0,
          pointerEvents: showToast ? 'auto' : 'none', // Allow clicks only when visible
      }}>
        {toastMessage}
      </div>
    </div>
  );
};

export default ServiceDetailPage;