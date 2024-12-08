import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: String,
  comment: {
    type: String,
    required: true
  },
  images: [String],
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;