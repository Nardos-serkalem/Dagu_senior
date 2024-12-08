import Review from '../models/Review.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate('user', 'name') // Populate user details if needed
    .populate('packageId', 'title') // Populate package details if needed
    .populate('hotelId', 'name'); // Populate hotel details if needed
  res.status(200).json(reviews);
});

// @desc    Get review by ID
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  res.status(200).json(review);
});

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
// Example for createReview function
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, packageId, hotelId } = req.body;

  // Input validation
  if (!rating || !comment || !packageId) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const review = new Review({
    user: req.user._id, // Assign the logged-in user
    rating,
    comment,
    packageId,
    hotelId,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  const updatedReview = await review.save();
  res.status(200).json(updatedReview);
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  await review.remove();
  res.status(204).json({ message: 'Review removed' });
});

export {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};