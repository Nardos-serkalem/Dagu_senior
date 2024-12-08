import Vehicle from '../models/Vehicle.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({});
  res.status(200).json(vehicles);
});

// @desc    Get vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    res.status(404);
    throw new Error('Vehicle not found');
  }

  res.status(200).json(vehicle);
});

// @desc    Create a new vehicle
// @route   POST /api/vehicles
// @access  Private/Admin
// Example for createVehicle function
const createVehicle = asyncHandler(async (req, res) => {
  const { type, model, capacity, licensePlate } = req.body;

  // Input validation
  if (!type || !model || !capacity || !licensePlate) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const vehicle = new Vehicle(req.body);
  const createdVehicle = await vehicle.save();
  res.status(201).json(createdVehicle);
});

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Private/Admin
const updateVehicle = asyncHandler(async (req, res) => {
  const { type, model, capacity, licensePlate, features, images } = req.body;

  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    res.status(404);
    throw new Error('Vehicle not found');
  }

  vehicle.type = type || vehicle.type;
  vehicle.model = model || vehicle.model;
  vehicle.capacity = capacity || vehicle.capacity;
  vehicle.licensePlate = licensePlate || vehicle.licensePlate;
  vehicle.features = features || vehicle.features;
  vehicle.images = images || vehicle.images;

  const updatedVehicle = await vehicle.save();
  res.status(200).json(updatedVehicle);
});

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Admin
const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    res.status(404);
    throw new Error('Vehicle not found');
  }

  await vehicle.remove();
  res.status(204).json({ message: 'Vehicle removed' });
});

export {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};