import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchServices } from '../app/features/serviceSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { services, loading, error } = useSelector((state) => state.services);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  
  // This function correctly navigates to the service detail page
  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="container">
      <h1>Our Services</h1>
      <main className="services-grid">
        {loading ? <p>Loading services...</p> : error ? <p className="error-message">{error}</p> : (
          services && services.map((service) => (
            // The onClick now calls the correct function
            <div key={service._id} className="service-card" onClick={() => handleServiceClick(service._id)}>
              <img src={service.imageUrl} alt={service.name} className="service-image" />
              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default HomePage;