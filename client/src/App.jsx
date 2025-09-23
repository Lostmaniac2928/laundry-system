import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CustomerProfilePage from './pages/CustomerProfilePage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageServicesPage from './pages/admin/ManageServicesPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ServiceDetailPage from './pages/ServiceDetailPage'; // Import new page
import ProfileDashboard from './components/profile/ProfileDashboard';
import PlacedOrders from './components/profile/PlacedOrders';
import CompletedOrders from './components/profile/CompletedOrders';
import CustomerSupport from './components/profile/CustomerSupport';
import MyLocations from './components/profile/MyLocations';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => { setSidebarOpen(!isSidebarOpen); };

  return (
    <Router>
      <div className="app-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/service/:id" element={<ServiceDetailPage />} />
            <Route path="/about" element={<div className="container"><h1>About Us Page</h1></div>} />
            <Route path="/contact" element={<div className="container"><h1>Contact Page</h1></div>} />

            <Route path="" element={<ProtectedRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order/:id" element={<OrderSummaryPage />} />
              <Route path="/profile" element={<CustomerProfilePage />}>
                <Route path="dashboard" element={<ProfileDashboard />} />
                <Route path="orders/placed" element={<PlacedOrders />} />
                <Route path="orders/completed" element={<CompletedOrders />} />
                <Route path="support" element={<CustomerSupport />} />
                <Route path="locations" element={<MyLocations />} />
              </Route>
            </Route>

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