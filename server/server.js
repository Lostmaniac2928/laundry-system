import path from 'path';
import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback'; // Import the new middleware
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import { notFound, errorHandler } from './middleware/errorHandler.js';

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// --- DEPLOYMENT SETUP ---
const __dirname = path.resolve();
// Use the history middleware
app.use(history());
// Serve the static files from the React build
app.use(express.static(path.join(__dirname, '/client/dist')));

// Test route (this will now be overridden by the static serving in production)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- ERROR HANDLING ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));