import mongoose from 'mongoose';

// A sub-schema for package data
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // The 'price' field is no longer needed here, as prices will be per-package
  packages: [packageSchema],
}, {
  timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;