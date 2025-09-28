import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api/apiHelper';

const PlacedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await apiFetch('/api/orders');
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {loading ? <p>Loading your orders...</p> : error ? <p className="error-message">{error}</p> : (
        <table className="orders-table">
          {/* ... table JSX ... */}
        </table>
      )}
    </div>
  );
};

export default PlacedOrders;