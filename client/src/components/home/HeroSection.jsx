import React from 'react';

const HeroSection = ({ isVisible }) => {
  return (
    <div className="hero-container">
      <div className={`hero-content ${isVisible ? '' : 'fade-out'}`}>
        <h1>FRESH. CLEAN. EFFORTLESS.</h1>
        <p>Your source for exceptional laundry and dry cleaning services.</p>
        <a href="#services" className="hero-btn">SCHEDULE PICKUP</a>
      </div>
    </div>
  );
};

export default HeroSection;