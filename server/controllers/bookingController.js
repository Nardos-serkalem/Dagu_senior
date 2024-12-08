import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import Package from '../models/Package.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { packageId, startDate, numberOfPeople, specialRequirements } = req.body;

  const tourPackage = await Package.findById(packageId);
  if (!tourPackage) {
    res.status(404);
    throw new Error('Package not found');
  }

  // Calculate end date based on package duration
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + tourPackage.duration);

  // Calculate total price
  const totalPrice = tourPackage.price * numberOfPeople;

  const booking = await Booking.create({
    user: req.user._id,
    package: packageId,
    startDate,
    endDate,
    numberOfPeople,
    totalPrice,
    specialRequirements,
    status: 'pending'
  });

  res.status(201).json(booking);
});

// @desc    Get all bookings for a user
// @route   GET /api/bookings
// @access  Private
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('package')
    .populate('guide')
    .populate('driver')
    .populate('vehicle')
    .populate('hotel');
  res.json(bookings);
});

// @desc    Get upcoming bookings
// @route   GET /api/bookings/upcoming
// @access  Private
const getUpcomingBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    user: req.user._id,
    startDate: { $gte: new Date() },
    status: { $in: ['pending', 'confirmed'] }
  })
    .populate('package')
    .sort({ startDate: 1 })
    .limit(5);
  res.json(bookings);
});

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private
const getBookingStats = asyncHandler(async (req, res) => {
  const stats = await Booking.aggregate([
    {
      $match: { user: req.user._id }
    },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        totalSpent: { $sum: '$totalPrice' },
        averageGroupSize: { $avg: '$numberOfPeople' }
      }
    }
  ]);

  const upcomingCount = await Booking.countDocuments({
    user: req.user._id,
    startDate: { $gte: new Date() },
    status: { $in: ['pending', 'confirmed'] }
  });

  res.json({
    stats: stats[0] || {
      totalBookings: 0,
      totalSpent: 0,
      averageGroupSize: 0
    },
    upcomingBookings: upcomingCount
  });
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('package')
    .populate('guide')
    .populate('driver')
    .populate('vehicle')
    .populate('hotel');

  if (booking) {
    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to view this booking');
    }
    res.json(booking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this booking');
    }

    // Only allow updating certain fields
    const allowedUpdates = ['specialRequirements'];
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        booking[key] = req.body[key];
      }
    });

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this booking');
    }

    // Only allow cancellation if the booking is pending
    if (booking.status !== 'pending') {
      res.status(400);
      throw new Error('Cannot cancel a confirmed or completed booking');
    }

    await booking.deleteOne();
    res.json({ message: 'Booking cancelled' });
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

export {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUpcomingBookings,
  getBookingStats
};