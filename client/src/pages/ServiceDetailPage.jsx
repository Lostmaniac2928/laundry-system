import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../app/features/cartSlice';

const ServiceDetailPage = () => {
  const { id: serviceId } = useParams();
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.services);
  
  const service = services.find(s => s._id === serviceId);

  const handleAddToCart = (pkg) => {
    const itemToAdd = {
        packageId: pkg._id, // This is the unique ID for the cart item
        name: pkg.name,
        price: pkg.price,
        serviceId: service._id,
        serviceName: service.name,
        imageUrl: service.imageUrl,
    };
    dispatch(addToCart(itemToAdd));
    alert(`${pkg.name} added to cart!`);
  };

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  if (!service) {
    return (
        <div className="container">
            <h2>Service Not Found</h2>
            <Link to="/">Back to Home</Link>
        </div>
    );
  }

  return (
    <div className="container">
      <div className="service-detail-header">
        <img src={service.imageUrl} alt={service.name} className="service-detail-image"/>
        <div className="service-detail-info">
            <h1>{service.name}</h1>
            <p>{service.description}</p>
        </div>
      </div>
      
      <div className="packages-section">
        <h2>Select a Package</h2>
        <div className="packages-list">
            {service.packages.length > 0 ? service.packages.map(pkg => (
                <div key={pkg._id} className="package-card">
                    <div className="package-info">
                        <h3>{pkg.name}</h3>
                        <span className="package-price">₹{pkg.price}</span>
                    </div>
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(pkg)}>
                        Add to Cart
                    </button>
                </div>
            )) : <p>No packages available for this service yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;