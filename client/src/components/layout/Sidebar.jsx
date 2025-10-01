import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../app/features/authSlice';
import { logout as logoutApiCall } from '../../api/authApi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      toggleSidebar(); // Close sidebar first
      await logoutApiCall();
      dispatch(logoutAction());
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="navbar-logo" onClick={toggleSidebar}>
            WIES
          </Link>
          <button onClick={toggleSidebar} className="close-btn">×</button>
        </div>
        <ul className="sidebar-links">
          <li><a href="/#services" onClick={toggleSidebar}>Services</a></li>
          <li><a href="/#about" onClick={toggleSidebar}>About</a></li>
          <li><a href="/#contact" onClick={toggleSidebar}>Contact</a></li>
          
          <hr className="sidebar-divider" />

          {userInfo ? (
            <>
              {userInfo.role === 'admin' ? (
                <li><Link to="/admin/dashboard" onClick={toggleSidebar}>Admin</Link></li>
              ) : (
                <li><Link to="/profile/dashboard" onClick={toggleSidebar}>My Profile</Link></li>
              )}
              <li><button onClick={handleLogout} className="sidebar-logout-button">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" onClick={toggleSidebar}>Account</Link></li>
          )}
        </ul>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;