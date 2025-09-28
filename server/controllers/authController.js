import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import 'dotenv/config';

// @desc    Find or create a user and send them an OTP
export const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await User.findOneAndUpdate(
      { phoneNumber },
      { otp, otpExpiry },
      { new: true, upsert: true }
    );

    // *** THIS IS THE FIX ***
    // Log the OTP to the console so you can see it in Render logs
    console.log(`OTP for ${phoneNumber} is: ${otp}`);

    res.status(200).json({ message: 'OTP sent successfully. Please check your server logs.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

// @desc    Verify OTP, log in the user, and return a token
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
      token: generateToken(user._id),
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};