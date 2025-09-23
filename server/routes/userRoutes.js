import express from 'express';
import { getUserProfile, addLocation, getUserStats } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/profile', protect, getUserProfile);

// Get user order stats
router.get('/stats', protect, getUserStats);

// Add a new saved location
router.post('/locations', protect, addLocation);

export default router;