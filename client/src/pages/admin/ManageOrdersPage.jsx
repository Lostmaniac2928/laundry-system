import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../../app/features/orderSlice';
import AdminMenu from '../../components/admin/AdminMenu';

const ManageOrdersPage = () => {
    const dispatch = useDispatch();
    
    // This is the corrected line
    const { orders, loading, error } = useSelector((state) => state.orders);

    const [statusChanges, setStatusChanges] = useState({});

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleStatusSelectChange = (orderId, newStatus) => {
        setStatusChanges({
            ...statusChanges,
            [orderId]: newStatus,
        });
    };

    const handleUpdateClick = (orderId) => {
        const newStatus = statusChanges[orderId];
        if (newStatus) {
            dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
            const newChanges = { ...statusChanges };
            delete newChanges[orderId];
            setStatusChanges(newChanges);
        }
    };

    const orderStatuses = ['Placed', 'Processing', 'Out for Delivery', 'Completed', 'Cancelled'];

    return (
        <div className="profile-page-container">
            <AdminMenu />
            <main className="profile-content">
                <h2>Manage All Orders</h2>
                {loading ? <p>Loading orders...</p> : error ? <p className="error-message">{error}</p> : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user?.phoneNumber || 'N/A'}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>₹{order.totalPrice}</td>
                                    <td>
                                        <select 
                                            value={statusChanges[order._id] || order.status} 
                                            onChange={(e) => handleStatusSelectChange(order._id, e.target.value)}
                                            className="status-select"
                                        >
                                            {orderStatuses.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="actions-cell">
                                        <button 
                                            className="btn-update"
                                            onClick={() => handleUpdateClick(order._id)}
                                            disabled={!statusChanges[order._id] || statusChanges[order._id] === order.status}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default ManageOrdersPage;