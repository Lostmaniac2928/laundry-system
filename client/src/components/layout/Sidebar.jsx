import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button onClick={toggleSidebar} className="close-btn">×</button>
        </div>
        <ul className="sidebar-links">
          <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
          <li><Link to="/login" onClick={toggleSidebar}>Login</Link></li>
          <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
        </ul>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;