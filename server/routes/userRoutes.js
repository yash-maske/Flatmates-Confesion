import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const COMMON_PASSWORD = process.env.SHARED_PASSWORD;
console.log('Loaded shared password:', COMMON_PASSWORD);

router.post('/login', async (req, res) => {
  try {
    // Check if body exists and is an object
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    let { name, password } = req.body;

    // Basic type and presence checks
    if (typeof name !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid input types' });
    }

    name = name.trim();

    if (!name || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Rate limiting placeholder (optional: implement middleware)
    // if (isTooManyAttempts(name)) {
    //   return res.status(429).json({ message: 'Too many login attempts. Please try again later.' });
    // }

    if (password !== COMMON_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: Update last login timestamp
    // await User.updateOne({ name }, { $set: { lastLogin: new Date() } });

    res.status(200).json({ message: 'Login successful', name: user.name });

  } catch (error) {
    console.error('Login error:', error);

    // Mongoose schema validation errors
    if (error.name === 'ValidationError') {
      return res.status(422).json({
        message: 'Validation failed',
        details: error.errors
      });
    }

    // MongoDB connection/network issues
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

    // Fallback for all unhandled exceptions
    return res.status(500).json({
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;
