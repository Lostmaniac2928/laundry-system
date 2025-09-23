import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <nav className="profile-sidebar">
      <h3>Admin Menu</h3>
      <NavLink to="/admin/dashboard" className="profile-nav-link">Dashboard</NavLink>
      <NavLink to="/admin/services" className="profile-nav-link">Manage Services</NavLink>
      <NavLink to="/admin/orders" className="profile-nav-link">Manage Orders</NavLink>
    </nav>
  );
};

export default AdminMenu;