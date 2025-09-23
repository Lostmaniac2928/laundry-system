import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// This route is protected by both 'protect' (is logged in) and 'admin' (has admin role)
router.route('/stats').get(protect, admin, getDashboardStats);

export default router;