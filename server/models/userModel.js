import mongoose from 'mongoose';

// A sub-schema for location data
const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+[1-9]\d{1,14}$/, 'Please fill a valid phone number'], // E.164 format
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // New field to store an array of addresses
  savedLocations: [locationSchema],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;