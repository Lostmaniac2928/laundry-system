import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../app/features/authSlice';
import { logout as logoutApiCall } from '../api/authApi';

const CustomerProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApiCall();
      dispatch(logoutAction());
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div className="profile-page-container">
      <nav className="profile-sidebar">
        <h3>My Account</h3>
        <NavLink to="/profile/dashboard" className="profile-nav-link">Dashboard</NavLink>
        <NavLink to="/profile/orders/placed" className="profile-nav-link">Placed Orders</NavLink>
        <NavLink to="/profile/orders/completed" className="profile-nav-link">Completed Orders</NavLink>
        <NavLink to="/profile/support" className="profile-nav-link">Customer Support</NavLink>
        <NavLink to="/profile/locations" className="profile-nav-link">My Locations</NavLink>
        <button onClick={handleLogout} className="sidebar-logout-button">Logout</button>
      </nav>
      <main className="profile-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default CustomerProfilePage;