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

    if (!name || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== COMMON_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user name as a mock token
    res.status(200).json({ message: 'Login successful', name: user.name });

  } catch (error) {
    console.error('Login error:', error);

    // MongoDB-specific error handling
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
      return res.status(503).json({ message: 'Database connection error. Please try again later.' });
    }

    // General internal server error
    return res.status(500).json({
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined // Don't expose stack in production
    });
  }
});

export default router;
