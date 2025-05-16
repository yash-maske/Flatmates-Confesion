import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables ASAP

const router = express.Router();

const COMMON_PASSWORD = process.env.SHARED_PASSWORD;
console.log('Loaded shared password:', COMMON_PASSWORD);

router.post('/login', async (req, res) => {
  try {
    console.log('Request body:', req.body);  // Debug input

    const { name, password } = req.body;

    // Check required fields
    if (!name || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check password against shared password
    if (password !== COMMON_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Find user in DB
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Success
    return res.status(200).json({ message: 'Login successful', name: user.name });

  } catch (error) {
    console.error('Login error:', error);

    if (error.name === 'ValidationError') {
      return res.status(422).json({
        message: 'Validation failed',
        details: error.errors
      });
    }

    if (
      error.name === 'MongoNetworkError' ||
      error.name === 'MongoServerError' ||
      error.name === 'MongooseServerSelectionError' ||
      error.code === 6
    ) {
      return res.status(503).json({
        message: 'Database connection error. Please try again later.'
      });
    }

    return res.status(500).json({
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;
