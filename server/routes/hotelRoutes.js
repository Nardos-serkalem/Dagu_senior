import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from '../controllers/hotelController.js';

const router = express.Router();

// Route to get all hotels
router.get('/', getHotels);

// Route to get a specific hotel by ID
router.get('/:id', getHotelById);

// Admin routes
router.post('/', protect, admin, createHotel); // Create a new hotel
router.put('/:id', protect, admin, updateHotel); // Update an existing hotel
router.delete('/:id', protect, admin, deleteHotel); // Delete a hotel

export default router;