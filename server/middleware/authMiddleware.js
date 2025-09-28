import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  // Read the Authorization header
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing after Bearer' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.userId).select('-otp -otpExpiry');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      // This will catch expired tokens or other verification errors
      res.status(401).json({ message: 'Not authorized, token failed verification' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token or invalid header' });
  }
};

export { protect };