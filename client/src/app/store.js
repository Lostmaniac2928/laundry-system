import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import serviceReducer from './features/serviceSlice';
import orderReducer from './features/orderSlice';
import adminReducer from './features/adminSlice';
import cartReducer from './features/cartSlice'; // Import the new reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    orders: orderReducer,
    admin: adminReducer,
    cart: cartReducer, // Add the cart reducer
  },
  devTools: true,
});

export default store;