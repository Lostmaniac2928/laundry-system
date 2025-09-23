import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../app/features/adminSlice';
import AdminMenu from '../components/admin/AdminMenu'; // Import the menu

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="profile-page-container">
      <AdminMenu />
      <main className="profile-content">
        <h2>Admin Dashboard</h2>
        {loading ? (
          <p>Loading stats...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Users</h3>
              <p className="card-value">{stats.totalUsers}</p>
            </div>
            <div className="card">
              <h3>Total Orders</h3>
              <p className="card-value">{stats.totalOrders}</p>
            </div>
            <div className="card">
              <h3>Total Revenue</h3>
              <p className="card-value">₹{stats.totalRevenue?.toFixed(2)}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;