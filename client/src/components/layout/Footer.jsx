import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Add the id="contact" here
    <footer id="contact" className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-logo">WIES</h3>
          <p className="footer-contact-info">Email: contact@wieslaundry.com</p>
          <p className="footer-contact-info">Phone: +91 12345 67890</p>
        </div>
        <div className="footer-right">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/#services">Services</a></li>
            <li><a href="/#about">About</a></li>
            <li><Link to="/profile/dashboard">My Account</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WIES Laundry. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;