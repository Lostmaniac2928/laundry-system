import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@laundrymat.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>123 Laundry Lane, Clean City, India</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 LaundryMat Management. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;