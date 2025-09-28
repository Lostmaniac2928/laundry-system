import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../app/features/authSlice';
import { logout as logoutApiCall } from '../../api/authApi';

const Navbar = ({ toggleSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
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
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          WLS
        </Link>
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-links">Services</Link>
          <Link to="/pricing" className="nav-links">Pricing</Link>
          <Link to="/how-it-works" className="nav-links">How It Works</Link>
          <Link to="/contact" className="nav-links">Contact</Link>
          {userInfo ? (
             <Link to="/profile/dashboard" className="nav-links nav-button">Account</Link>
          ) : (
            <Link to="/login" className="nav-links nav-button">Account</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;