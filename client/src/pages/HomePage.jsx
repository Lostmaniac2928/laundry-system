import React, { useState, useEffect, useRef } from 'react';
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

  const [aboutRef, isAboutVisible] = useScrollAnimation({ threshold: 0.2 });
  const [servicesRef, areServicesVisible] = useScrollAnimation({ threshold: 0.1 });

  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchServices());

    const heroScrollHandler = () => {
      setHeroVisible(window.scrollY < window.innerHeight / 2);
    };

    window.addEventListener('scroll', heroScrollHandler);
    return () => window.removeEventListener('scroll', heroScrollHandler);
  }, [dispatch]);

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) {
        const scrollPercentage = scrollLeft / maxScrollLeft;
        const newIndex = Math.round(scrollPercentage * (services.length - 1));
        setActiveIndex(newIndex);
      }
    }
  };

  const handleDotClick = (index) => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) {
        const newScrollLeft = (index / (services.length - 1)) * maxScrollLeft;
        scrollContainerRef.current.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleArrowClick = (direction) => {
    if (scrollContainerRef.current) {
        const scrollAmount = 320;
        if (direction === 'left') {
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="home-page-wrapper">
      <div className="sticky-section hero-section-wrapper" style={{ zIndex: 1 }}>
        <HeroSection isVisible={isHeroVisible} />
      </div>

      <div ref={aboutRef} className={`sticky-section about-section-wrapper scroll-section ${isAboutVisible ? 'is-visible' : ''}`} style={{ zIndex: 2 }}>
        <AboutSection />
      </div>
      
      <div ref={servicesRef} id="services" className={`sticky-section services-section-wrapper scroll-section ${areServicesVisible ? 'is-visible' : ''}`} style={{ zIndex: 3 }}>
        <div className="section-container">
          <h2>Our Services</h2>
          <div className="services-wrapper">
            <button className="scroll-arrow left" onClick={() => handleArrowClick('left')}>‹</button>
            <div 
              className="services-scroll-container" 
              ref={scrollContainerRef}
              onScroll={handleScroll}
            >
              {loading ? <p>Loading...</p> : error ? <p className="error-message">{error}</p> : (
                services.map((service) => (
                  <div key={service._id} className="service-card" onClick={() => handleServiceClick(service._id)}>
                    <img src={service.imageUrl} alt={service.name} className="service-card-image" />
                    <div className="service-card-content"><h3>{service.name}</h3></div>
                    <span className="service-explore-link">EXPLORE NOW →</span>
                  </div>
                ))
              )}
            </div>
            <button className="scroll-arrow right" onClick={() => handleArrowClick('right')}>›</button>
          </div>
          {!loading && services && services.length > 0 && (
            <div className="custom-scrollbar">
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`scroll-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* This spacer div has been removed */}
    </div>
  );
};

export default HomePage;