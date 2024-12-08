import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';

const reviewRouter = express.Router();

// Route to get all reviews
reviewRouter.get('/', getReviews);

// Route to get a specific review by ID
reviewRouter.get('/:id', getReviewById);

// Protected routes for creating, updating, and deleting reviews
reviewRouter.post('/', protect, admin, createReview); // Create a new review

// Export the router
export default reviewRouter;
