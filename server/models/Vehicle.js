import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
  features: [String],
  images: [String],
  available: {
    type: Boolean,
    default: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  maintenanceHistory: [{
    date: Date,
    description: String,
    cost: Number
  }],
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, {
  timestamps: true
});

vehicleSchema.index({ currentLocation: '2dsphere' });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;