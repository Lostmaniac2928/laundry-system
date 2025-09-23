import React, { useState, useEffect } from 'react'; // This is the corrected line
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../app/features/orderSlice';
import { clearCart } from '../app/features/cartSlice';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector(state => state.auth);
    const { cartItems, totalPrice } = useSelector(state => state.cart);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (userInfo && userInfo.savedLocations && userInfo.savedLocations.length > 0) {
            setSelectedLocation(userInfo.savedLocations[0]);
        }
    }, [userInfo]);


    const handlePlaceOrder = async () => {
        if (!selectedLocation) {
            setError('Please select a pickup location.');
            return;
        }

        const orderData = {
            orderItems: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                qty: item.qty,
                serviceId: item.serviceId,
                serviceName: item.serviceName,
                imageUrl: item.imageUrl,
            })),
            pickupLocation: selectedLocation,
            totalPrice: totalPrice,
        };

        try {
            await dispatch(createOrder(orderData)).unwrap();
            dispatch(clearCart());
            alert('Order placed successfully!');
            navigate('/profile/orders/placed');
        } catch (err) {
            setError(err || 'Failed to place order.');
        }
    };

    if (!userInfo) {
        return <div className="container"><p>Loading user data...</p></div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="container">
                <h2>Your cart is empty.</h2>
                <Link to="/">Go back to shopping</Link>
            </div>
        );
    }
    
    return (
        <div className="container">
            <div className="order-summary-container">
                <div className="order-details">
                    <h2>Confirm Your Order</h2>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.packageId} className="cart-item">
                                <img src={item.imageUrl} alt={item.serviceName} className="cart-item-icon-image" />
                                <div className="cart-item-details">
                                    <p className="cart-item-service-name">{item.serviceName}</p>
                                    <Link to={`/service/${item.serviceId}`}>{item.name}</Link>
                                    <span>(Qty: {item.qty})</span>
                                </div>
                                <div className="cart-item-price-summary">
                                    <span>₹{(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="location-selection">
                    <h3>Select Pickup Location</h3>
                    {userInfo.savedLocations && userInfo.savedLocations.length > 0 ? (
                        <div className="locations-radio-group">
                            {userInfo.savedLocations.map((loc, index) => (
                                <label key={index} className="location-radio">
                                    <input
                                        type="radio"
                                        name="location"
                                        checked={selectedLocation?._id === loc._id}
                                        onChange={() => setSelectedLocation(loc)}
                                    />
                                    <div className="location-option">
                                        <p><strong>Address:</strong> {loc.address}</p>
                                        <p>{loc.city}, {loc.postalCode}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p>You have no saved locations. Please <Link to="/profile/locations">add one</Link> before placing an order.</p>
                    )}
                    <div className="cart-summary checkout-summary">
                        <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button
                        onClick={handlePlaceOrder}
                        className="place-order-btn"
                        disabled={!selectedLocation || !userInfo.savedLocations || userInfo.savedLocations.length === 0}
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;