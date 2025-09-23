import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const CustomerProfilePage = () => {
  return (
    <div className="profile-page-container">
      <nav className="profile-sidebar">
        <h3>My Account</h3>
        <NavLink to="/profile/dashboard" className="profile-nav-link">Dashboard</NavLink>
        <NavLink to="/profile/orders/placed" className="profile-nav-link">Placed Orders</NavLink>
        <NavLink to="/profile/orders/completed" className="profile-nav-link">Completed Orders</NavLink>
        <NavLink to="/profile/support" className="profile-nav-link">Customer Support</NavLink>
        <NavLink to="/profile/locations" className="profile-nav-link">My Locations</NavLink>
      </nav>
      <main className="profile-content">
        <Outlet /> 
      </main>
    </div>
  );
};
// The <Outlet /> component renders the currently active nested route 
// (e.g., the ProfileDashboard component).

export default CustomerProfilePage;