import Hotel from '../models/Hotel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
const getHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({});
  res.status(200).json(hotels);
});

// @desc    Get hotel by ID
// @route   GET /api/hotels/:id
// @access  Public
const getHotelById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  res.status(200).json(hotel);
});

// @desc    Create a new hotel
// @route   POST /api/hotels
// @access  Private/Admin
// Example for createHotel function
const createHotel = asyncHandler(async (req, res) => {
  const { name, location, description, rooms, amenities } = req.body;

  // Input validation
  if (!name || !location || !description || !rooms) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const hotel = new Hotel({
    name,
    location,
    description,
    rooms,
    amenities,
  });

  const createdHotel = await hotel.save();
  res.status(201).json(createdHotel);
});

// @desc    Update a hotel
// @route   PUT /api/hotels/:id
// @access  Private/Admin
const updateHotel = asyncHandler(async (req, res) => {
  const { name, location, description, rooms, amenities } = req.body;

  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  hotel.name = name || hotel.name;
  hotel.location = location || hotel.location;
  hotel.description = description || hotel.description;
  hotel.rooms = rooms || hotel.rooms;
  hotel.amenities = amenities || hotel.amenities;

  const updatedHotel = await hotel.save();
  res.status(200).json(updatedHotel);
});

// @desc    Delete a hotel
// @route   DELETE /api/hotels/:id
// @access  Private/Admin
const deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  await hotel.remove();
  res.status(204).json({ message: 'Hotel removed' });
});

export {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
};