import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        // Package details
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        // Parent service details
        serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Service' },
        serviceName: { type: String, required: true },
        imageUrl: { type: String, required: true },
      },
    ],
    pickupLocation: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      required: true,
      enum: ['Placed', 'Processing', 'Out for Delivery', 'Completed', 'Cancelled'],
      default: 'Placed',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;