import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserStats } from '../../api/userApi';

const ProfileDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getUserStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome back, {userInfo?.phoneNumber}!</p>
      
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Orders</h3>
            <p className="card-value">{stats.totalOrders}</p>
          </div>
          <div className="card">
            <h3>Completed Orders</h3>
            <p className="card-value">{stats.completedOrders}</p>
          </div>
          <div className="card">
            <h3>Pending Orders</h3>
            <p className="card-value">{stats.pendingOrders}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;