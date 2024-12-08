import asyncHandler from 'express-async-handler';
import Package from '../models/Package.js';

// @desc    Create a new package
// @route   POST /api/packages
// @access  Private/Admin
// Example for createPackage function
const createPackage = asyncHandler(async (req, res) => {
  const { title, description, duration, price } = req.body;

  // Input validation
  if (!title || !description || !duration || !price) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const newPackage = await Package.create(req.body);
  res.status(201).json(newPackage);
});

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find({});
  res.json(packages);
});

// @desc    Get featured packages
// @route   GET /api/packages/featured
// @access  Public
const getFeaturedPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find({ featured: true });
  res.json(packages);
});

// @desc    Get recent packages
// @route   GET /api/packages/recent
// @access  Public
const getRecentPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find({})
    .sort({ createdAt: -1 })
    .limit(6);
  res.json(packages);
});

// @desc    Get package by ID
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = asyncHandler(async (req, res) => {
  const Package = await Package.findById(req.params.id);
  if (Package) {
    res.json(Package);
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = asyncHandler(async (req, res) => {
  const Package = await Package.findById(req.params.id);

  if (Package) {
    Object.assign(Package, req.body);
    const updatedPackage = await Package.save();
    res.json(updatedPackage);
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = asyncHandler(async (req, res) => {
  const Package = await Package.findById(req.params.id);

  if (Package) {
    await Package.deleteOne();
    res.json({ message: 'Package removed' });
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

export {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getFeaturedPackages,
  getRecentPackages
};