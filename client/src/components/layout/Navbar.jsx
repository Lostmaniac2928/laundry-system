import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../app/features/authSlice';
import { logout as logoutApiCall } from '../../api/authApi';

const Navbar = ({ toggleSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall();
      dispatch(logoutAction());
      setDropdownOpen(false);
      navigate('/'); // Changed to home page
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div onClick={handleLogoClick} className="navbar-logo">
          WIES
        </div>
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
        <nav className="nav-menu">
          <a href="/#services" className="nav-links">Services</a>
          <a href="/#about" className="nav-links">About</a>
          <a href="/#contact" className="nav-links">Contact</a>

          {userInfo ? (
            <div className="profile-dropdown" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="profile-dropdown-btn">
                <span>{userInfo.role === 'admin' ? 'Admin' : userInfo.phoneNumber}</span>
                <svg className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                {userInfo.role === 'admin' ? (
                  <>
                    <Link to="/admin/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Admin Dashboard</Link>
                    <Link to="/admin/services" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Manage Services</Link>
                    <Link to="/admin/orders" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Manage Orders</Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>My Dashboard</Link>
                    <Link to="/profile/orders/placed" className="dropdown-item" onClick={() => setDropdownOpen(false)}>My Orders</Link>
                    <Link to="/profile/locations" className="dropdown-item" onClick={() => setDropdownOpen(false)}>My Locations</Link>
                  </>
                )}
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-links nav-button">Account</Link>
          )}

          <Link to="/cart" className="nav-links">
            <div className="cart-icon">
              🛒
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>}
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;