import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../../app/features/orderSlice';

const PlacedOrders = () => {
  const dispatch = useDispatch();
  // We select the whole 'orders' state to get loading and error info
  const { orders, loading, error } = useSelector((state) => state.orders);

  // This useEffect now runs every time the component is mounted
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading your orders...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>You have no orders.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 10)}...</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase().replace(/ /g, '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-details">Details</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlacedOrders;