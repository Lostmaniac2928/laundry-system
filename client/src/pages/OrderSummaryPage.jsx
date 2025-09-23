import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../app/features/orderSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const OrderSummaryPage = () => {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.services);
  const { userInfo } = useSelector((state) => state.auth);
  const { createOrderLoading, createOrderError } = useSelector((state) => state.orders);

  const selectedService = services.find((s) => s._id === serviceId);
  
  const [selectedLocation, setSelectedLocation] = useState(
    userInfo.savedLocations.length > 0 ? userInfo.savedLocations[0] : null
  );
  
  const handlePlaceOrder = async () => {
    if (!selectedLocation) {
      // This logic is mostly for UI state, not a full-blown error
      alert('Please select a pickup location.');
      return;
    }

    const orderData = {
      orderItems: [
        {
          _id: selectedService._id,
          name: selectedService.name,
          price: selectedService.price,
          imageUrl: selectedService.imageUrl,
        }
      ],
      pickupLocation: {
        address: selectedLocation.address,
        city: selectedLocation.city,
        postalCode: selectedLocation.postalCode,
      },
    };

    try {
      const resultAction = await dispatch(createOrder(orderData));
      unwrapResult(resultAction); // This will throw an error if the thunk was rejected
      alert('Order placed successfully!');
      navigate('/profile/orders/placed');
    } catch (err) {
      // The error from the slice's rejectWithValue will be caught here
      alert(`Failed to place order: ${err}`);
    }
  };
  
  if (!selectedService) {
    return (
      <div className="container">
        <h2>Service not found</h2>
        <p>The service you are looking for does not exist. <Link to="/">Go back to Home</Link>.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="order-summary-container">
        <div className="order-details">
          <h2>Order Summary</h2>
          <div className="summary-card">
            <img src={selectedService.imageUrl} alt={selectedService.name} />
            <div className="summary-info">
              <h3>{selectedService.name}</h3>
              <p>{selectedService.description}</p>
              <span className="summary-price">₹{selectedService.price}</span>
            </div>
          </div>
        </div>
        
        <div className="location-selection">
          <h3>Select Pickup Location</h3>
          {userInfo.savedLocations.length > 0 ? (
            <div className="locations-radio-group">
              {userInfo.savedLocations.map((loc, index) => (
                <label key={index} className="location-radio">
                  <input
                    type="radio"
                    name="location"
                    value={index}
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
            <p>You have no saved locations. Please <Link to="/profile/locations">add one</Link>.</p>
          )}

          {createOrderError && <p className="error-message">{createOrderError}</p>}
          
          <button 
            onClick={handlePlaceOrder} 
            className="place-order-btn"
            disabled={!selectedLocation || createOrderLoading}
          >
            {createOrderLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;