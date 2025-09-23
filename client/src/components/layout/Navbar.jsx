import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../app/features/authSlice';
import { logout as logoutApiCall } from '../../api/authApi';

const Navbar = ({ toggleSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart); // Get cart items
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
          LaundryMat
        </Link>
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
        <nav className="nav-menu">
          <Link to="/cart" className="nav-links">
            <div className="cart-icon">
              🛒
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>}
            </div>
          </Link>
          <Link to="/" className="nav-links">Home</Link>
          <Link to="/about" className="nav-links">About</Link>
          <Link to="/contact" className="nav-links">Contact</Link>
          {userInfo ? (
            <div className="nav-user-info">
              {userInfo.role === 'admin' && (
                <Link to="/admin/dashboard" className="nav-links nav-button">Admin</Link>
              )}
              <Link to="/profile/dashboard" className="nav-links profile-link">
                {userInfo.phoneNumber}
              </Link>
              <button onClick={handleLogout} className="nav-button logout">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="nav-links nav-button">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;