import React from 'react';

const AboutSection = () => {
  return (
    <div id="about" className="content-section">
      <div className="section-container">
        {/* Wrapper for the left-side animation */}
        <div className="about-content animate-left">
          <h2>About WIES</h2>
        </div>
        {/* Wrapper for the right-side animation */}
        <div className="about-content animate-right">
          <p>
            We are dedicated to providing the highest quality laundry and dry cleaning services with a focus on convenience and customer satisfaction. Our state-of-the-art facility and expert team ensure your garments are treated with the utmost care, returning them to you fresh, clean, and ready to wear.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;