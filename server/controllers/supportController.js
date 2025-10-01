import asyncHandler from 'express-async-handler';
import SupportTicket from '../models/supportTicketModel.js';

// @desc    Create a new support ticket
// @route   POST /api/support
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const ticket = new SupportTicket({
    user: req.user._id,
    subject,
    message,
  });
  const createdTicket = await ticket.save();
  res.status(201).json(createdTicket);
});

export { createTicket };