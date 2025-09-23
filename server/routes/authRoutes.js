import express from 'express';
// Import the new controller function
import { sendOtp, verifyOtp, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);

// @desc    Verify OTP and log in user
// @route   POST /api/auth/verify-otp
// @access  Public
router.post('/verify-otp', verifyOtp);
router.post('/logout', logoutUser);

export default router;