import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchServices } from '../app/features/serviceSlice';
import HeroSection from '../components/home/HeroSection'; // Import the new component

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <>
      <HeroSection />
      <div className="services-container">
        <main className="services-grid">
          {loading ? <p>Loading services...</p> : error ? <p className="error-message">{error}</p> : (
            services && services.map((service) => (
              <div key={service._id} className="service-card" onClick={() => handleServiceClick(service._id)}>
                <div className="service-card-content">
                  <h3>{service.name}</h3>
                  {/* In the future, you can replace these with actual icons */}
                  <div className="service-icon-placeholder">🧺</div>
                </div>
                <span className="service-explore-link">EXPLORE NOW →</span>
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default HomePage;