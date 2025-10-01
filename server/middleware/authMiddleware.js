import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-otp -otpExpiry');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      next();
    } catch (error) {
      // This is the important addition for debugging
      console.error('TOKEN VERIFICATION FAILED:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed verification' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };