import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController.js';

const vehicleRouter = express.Router();

// Route to get all vehicles
vehicleRouter.get('/', getVehicles);

// Route to get a specific vehicle by ID
vehicleRouter.get('/:id', getVehicleById);

// Admin routes for creating, updating, and deleting vehicles
vehicleRouter.post('/', protect, admin, createVehicle); // Create a new vehicle
vehicleRouter.put('/:id', protect, admin, updateVehicle); // Update an existing vehicle
vehicleRouter.delete('/:id', protect, admin, deleteVehicle); // Delete a vehicle

export default vehicleRouter;
