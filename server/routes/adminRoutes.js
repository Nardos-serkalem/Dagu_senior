// routes/adminRoutes.js
import express from 'express';
import User from '../models/User.js'; // Corrected to use User model
import generateToken from '../utils/generateToken.js'; 
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

export default router;