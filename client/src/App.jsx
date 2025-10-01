import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import ScrollToTop from './components/common/ScrollToTop'; // Import the new component

// Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CustomerProfilePage from './pages/CustomerProfilePage';

// Admin Page Components
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageServicesPage from './pages/admin/ManageServicesPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';

// Profile Page Components
import ProfileDashboard from './components/profile/ProfileDashboard';
import PlacedOrders from './components/profile/PlacedOrders';
import CompletedOrders from './components/profile/CompletedOrders';
import CustomerSupport from './components/profile/CustomerSupport';
import MyLocations from './components/profile/MyLocations';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <ScrollToTop /> {/* This component ensures navigation starts at the top */}
      <div className="app-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/service/:id" element={<ServiceDetailPage />} />
            <Route path="/about" element={<div className="container content-section"><h1>About Us</h1></div>} />
            <Route path="/contact" element={<div className="container content-section"><h1>Contact Us</h1></div>} />

            {/* Protected User Routes */}
            <Route path="" element={<ProtectedRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<CustomerProfilePage />}>
                <Route path="dashboard" element={<ProfileDashboard />} />
                <Route path="orders/placed" element={<PlacedOrders />} />
                <Route path="orders/completed" element={<CompletedOrders />} />
                <Route path="support" element={<CustomerSupport />} />
                <Route path="locations" element={<MyLocations />} />
              </Route>
            </Route>

            {/* Protected Admin Routes */}
            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/services" element={<ManageServicesPage />} />
              <Route path="/admin/orders" element={<ManageOrdersPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;