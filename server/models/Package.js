import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  locations: [{
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  }],
  includes: [String],
  excludes: [String],
  images: [String],
  maxGroupSize: Number,
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging']
  },
  startDates: [Date],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Package = mongoose.model('Package', packageSchema);
export default Package;