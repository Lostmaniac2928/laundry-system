import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateCartQuantity, removeFromCart } from '../app/features/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const handleQuantityChange = (id, qty) => {
        dispatch(updateCartQuantity({ packageId: id, qty }));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        if (userInfo) {
            navigate('/checkout');
        } else {
            navigate('/login', { state: { from: '/checkout' } });
        }
    };

    return (
        <div className="container cart-container">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    Your cart is empty. <Link to="/">Go Shopping</Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.packageId} className="cart-item">
                                {/* Use the new CSS class here */}
                                <img src={item.imageUrl} alt={item.serviceName} className="cart-item-icon-image" />
                                <div className="cart-item-details">
                                    <p className="cart-item-service-name">{item.serviceName}</p>
                                    <Link to={`/service/${item.serviceId}`}>{item.name}</Link>
                                    <span>₹{item.price}</span>
                                </div>
                                <div className="cart-item-actions">
                                    <select value={item.qty} onChange={(e) => handleQuantityChange(item.packageId, e.target.value)}>
                                        {[...Array(5).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => handleRemove(item.packageId)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Summary</h2>
                        <p>Total Items: {cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>
                        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;