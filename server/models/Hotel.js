import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: Number,
  amenities: [String],
  images: [String],
  available: {
    type: Boolean,
    default: true
  }
});

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    address: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  description: String,
  images: [String],
  rating: {
    type: Number,
    default: 0
  },
  rooms: [roomSchema],
  amenities: [String],
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;