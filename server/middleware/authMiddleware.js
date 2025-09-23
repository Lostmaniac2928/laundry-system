import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the httpOnly cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach user to the request object, excluding password/OTP info
      req.user = await User.findById(decoded.userId).select('-otp -otpExpiry');
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };