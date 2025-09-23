import path from 'path'; // Import path module
import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import { notFound, errorHandler } from './middleware/errorHandler.js';

// Connect to the database
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// --- Deployment Setup ---
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  // Set the client/dist folder as a static folder
  app.use(express.static(path.join(__dirname, '/client/dist')));

  // For any route that is not an API route, serve the index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
} else {
  // A simple route to test if the server is running in development
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));