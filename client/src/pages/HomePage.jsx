import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchServices } from '../app/features/serviceSlice';
import useScrollAnimation from '../hooks/useScrollAnimation';

import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { services, loading, error } = useSelector((state) => state.services);
  const [isHeroVisible, setHeroVisible] = useState(true);

  // Apply the hook to our sections
  const [aboutRef, isAboutVisible] = useScrollAnimation({ threshold: 0.2 });
  const [servicesRef, areServicesVisible] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    dispatch(fetchServices());

    const handleScroll = () => {
      setHeroVisible(window.scrollY < window.innerHeight / 2); // Fade out hero content halfway down
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <>
      <HeroSection isVisible={isHeroVisible} />

      {/* Apply animation ref and classes directly */}
      <div ref={aboutRef} className={`scroll-section ${isAboutVisible ? 'is-visible' : ''}`}>
        <AboutSection />
      </div>
      
      <div ref={servicesRef} id="services" className={`content-section dark-bg scroll-section ${areServicesVisible ? 'is-visible' : ''}`}>
        <div className="section-container">
          <h2>Our Services</h2>
          <div className="services-scroll-container">
            {loading ? <p>Loading...</p> : error ? <p className="error-message">{error}</p> : (
              services.map((service) => (
                <div key={service._id} className="service-card" onClick={() => handleServiceClick(service._id)}>
                  <img src={service.imageUrl} alt={service.name} className="service-card-image" />
                  <div className="service-card-content">
                    <h3>{service.name}</h3>
                  </div>
                  <span className="service-explore-link">EXPLORE NOW →</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;