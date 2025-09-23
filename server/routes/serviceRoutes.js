import express from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getServices);
router.route('/:id').get(getServiceById);

// Admin-only routes
router.route('/').post(protect, admin, createService);
router.route('/:id').put(protect, admin, updateService);
router.route('/:id').delete(protect, admin, deleteService);

export default router;