import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // The 'protect' middleware already finds the user by id
  const user = req.user;
  if (user) {
    res.status(200).json({
      _id: user._id,
      phoneNumber: user.phoneNumber,
      role: user.role,
      savedLocations: user.savedLocations,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add a new location to user profile
// @route   POST /api/users/locations
// @access  Private
const addLocation = asyncHandler(async (req, res) => {
  const { address, city, postalCode } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    const newLocation = { address, city, postalCode };
    user.savedLocations.push(newLocation);
    const updatedUser = await user.save();
    res.status(201).json({
      _id: updatedUser._id,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      savedLocations: updatedUser.savedLocations,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user's order stats
// @route   GET /api/users/stats
// @access  Private
const getUserStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const totalOrders = await Order.countDocuments({ user: userId });
    const completedOrders = await Order.countDocuments({ user: userId, status: 'Completed' });
    const pendingOrders = await Order.countDocuments({ user: userId, status: { $in: ['Placed', 'Processing', 'Out for Delivery'] } });
    res.json({ totalOrders, completedOrders, pendingOrders });
});

export { getUserProfile, addLocation, getUserStats };