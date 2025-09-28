import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import twilio from 'twilio'; // Assuming you might add this back
import 'dotenv/config';

// ... (Twilio client setup if you use it) ...

export const sendOtp = async (req, res) => {
  // ... (sendOtp logic remains the same)
};

export const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      _id: user._id,
      phoneNumber: user.phoneNumber,
      role: user.role,
      savedLocations: user.savedLocations,
      token: generateToken(user._id), // Send token in the body
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = (req, res) => {
  // Client-side will handle token removal. This endpoint is now optional.
  res.status(200).json({ message: 'Logout successful' });
};