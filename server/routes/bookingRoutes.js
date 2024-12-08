import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUpcomingBookings,
  getBookingStats
} from '../controllers/bookingController.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getBookings);

router.get('/upcoming', protect, getUpcomingBookings);
router.get('/stats', protect, getBookingStats);
router.route('/:id')
  .get(protect, getBookingById)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

export default router;