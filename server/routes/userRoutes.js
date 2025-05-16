import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const COMMON_PASSWORD = process.env.SHARED_PASSWORD;
console.log('Loaded shared password:', COMMON_PASSWORD);

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Validation error: missing fields
    if (!name || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Authentication error: incorrect password
    if (password !== COMMON_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const user = await User.findOne({ name });

    // Not found error: user doesn't exist
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Success response
    res.status(200).json({ message: 'Login successful', name: user.name });

  } catch (error) {
    console.error('Login error:', error);

    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(422).json({
        message: 'Validation failed',
        details: error.errors
      });
    }

    // MongoDB network or server issues
    if (
      error.name === 'MongoNetworkError' ||
      error.name === 'MongoServerError' ||
      error.name === 'MongooseServerSelectionError' ||
      error.code === 6 // HostUnreachable error code
    ) {
      return res.status(503).json({
        message: 'Database connection error. Please try again later.'
      });
    }

    // Catch-all internal server error
    return res.status(500).json({
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;
