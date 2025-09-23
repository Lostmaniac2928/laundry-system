import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const totalOrders = await Order.countDocuments({});

  // Calculate total revenue from completed orders using aggregation
  const revenueResult = await Order.aggregate([
    {
      $match: { status: 'Completed' }, // Only consider completed orders
    },
    {
      $group: {
        _id: null, // Group all documents into one
        totalRevenue: { $sum: '$totalPrice' }, // Sum the totalPrice field
      },
    },
  ]);

  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  res.json({
    totalUsers,
    totalOrders,
    totalRevenue,
  });
});

export { getDashboardStats };