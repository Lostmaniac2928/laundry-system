import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../../app/features/orderSlice';

const CompletedOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  // We still fetch all orders, as the list might not be in the state yet
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // Filter for completed orders before rendering
  const completedOrders = orders.filter(order => order.status === 'Completed');

  return (
    <div className="orders-container">
      <h2>Completed Orders</h2>
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
            {completedOrders.length === 0 ? (
              <tr>
                <td colSpan="5">You have no completed orders.</td>
              </tr>
            ) : (
              completedOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <span className={`status-badge status-completed`}>
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

export default CompletedOrders;