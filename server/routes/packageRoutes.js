import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getFeaturedPackages,
  getRecentPackages
} from '../controllers/packageController.js';

const router = express.Router();

router.get('/', getPackages);
router.get('/featured', getFeaturedPackages);
router.get('/recent', getRecentPackages);
router.get('/:id', getPackageById);

// Admin routes
router.post('/', protect, admin, createPackage);
router.put('/:id', protect, admin, updatePackage);
router.delete('/:id', protect, admin, deletePackage);

export default router;