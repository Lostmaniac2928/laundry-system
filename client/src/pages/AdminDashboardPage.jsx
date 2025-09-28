import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api/apiHelper'; // Import our new helper
import AdminMenu from '../components/admin/AdminMenu';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await apiFetch('/api/admin/stats');
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, []);

  return (
    <div className="profile-page-container">
      <AdminMenu />
      <main className="profile-content">
        <h2>Admin Dashboard</h2>
        {loading ? <p>Loading stats...</p> : error ? <p className="error-message">{error}</p> : (
          <div className="dashboard-cards">
            <div className="card"><h3>Total Users</h3><p className="card-value">{stats.totalUsers}</p></div>
            <div className="card"><h3>Total Orders</h3><p className="card-value">{stats.totalOrders}</p></div>
            <div className="card"><h3>Total Revenue</h3><p className="card-value">₹{stats.totalRevenue?.toFixed(2)}</p></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;