import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// User routes
router.route('/').post(protect, createOrder).get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

// Admin routes
router.route('/all').get(protect, admin, getAllOrders);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

export default router;