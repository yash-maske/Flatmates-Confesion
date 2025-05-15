// routes/auth.js
import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config(); 
const COMMON_PASSWORD = process.env.SHARED_PASSWORD
console.log(COMMON_PASSWORD)

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json({ message: 'All fields required' });

  if (password !== COMMON_PASSWORD) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const user = await User.findOne({ name });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // For simplicity, return user name as token
  res.json({ message: 'Login successful', name: user.name });
});

export default router;
