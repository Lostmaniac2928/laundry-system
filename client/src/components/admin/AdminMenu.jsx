import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../app/features/authSlice';
import { logout as logoutApiCall } from '../../api/authApi';

const AdminMenu = () => {
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
    <nav className="profile-sidebar">
      <h3>Admin Menu</h3>
      <NavLink to="/admin/dashboard" className="profile-nav-link">Dashboard</NavLink>
      <NavLink to="/admin/services" className="profile-nav-link">Manage Services</NavLink>
      <NavLink to="/admin/orders" className="profile-nav-link">Manage Orders</NavLink>
      <button onClick={handleLogout} className="sidebar-logout-button">Logout</button>
    </nav>
  );
};

export default AdminMenu;