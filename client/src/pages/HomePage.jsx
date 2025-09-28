import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../api/apiHelper'; // Import apiFetch
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/features/cartSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get user info directly from localStorage to decide on navigation
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await apiFetch('/api/services');
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, []);

  const handleAddToCart = (service) => {
    // This part still uses Redux for the cart, which is fine
    dispatch(addToCart(service)); 
    alert(`${service.name} added to cart!`);
  };

  return (
    <div className="container">
      <h1>Our Services</h1>
      <main className="services-grid">
        {loading ? <p>Loading services...</p> : error ? <p className="error-message">{error}</p> : (
          services && services.map((service) => (
            <div key={service._id} className="service-card" onClick={() => handleAddToCart(service)}>
              <img src={service.imageUrl} alt={service.name} className="service-image" />
              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-card-footer">
                    <span className="service-price">Packages Available</span>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default HomePage;